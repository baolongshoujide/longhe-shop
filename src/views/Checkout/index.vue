<script setup>
import {
  getCheckoutAPI,
  createOrderAPI,
  addAddressAPI,
  editAddressAPI,
  delAddressAPI,
} from "@/api/checkout";
import { ref, nextTick, computed } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/cartStore";
import { ElMessage, ElMessageBox } from "element-plus";
import { regionData } from "element-china-area-data";
import { Close, Edit } from "@element-plus/icons-vue";
import DataLoading from "@/components/DataLoading.vue";

const checkInfo = ref(); // 订单对象
const checkoutLoading = ref(true);
const curAddress = ref(); // 地址对象
const editingAddressId = ref(null);
const isEditingAddress = computed(() => editingAddressId.value !== null);
const router = useRouter();
const cartStore = useCartStore();
// 获取收货地址(拉取渲染数据)
const getCheckout = async () => {
  checkoutLoading.value = true;
  try {
    const res = await getCheckoutAPI();
    checkInfo.value = res.data.result;
    curAddress.value = checkInfo.value.userAddresses.find((item) => item.isDefault === 0);
  } finally { checkoutLoading.value = false; }
};
getCheckout();
// 删除收货地址（那个叉号）
const delAddress = async (id) => {
  const res = await delAddressAPI({ id });
  console.log(res);
  getCheckout();
};
// 编辑收货地址
const editAddress = (item) => {
  editingAddressId.value = item.id;
  addFlag.value = true;

  formModel.value = {
    address: {
      sheng: item.provinceCode,
      shi: item.cityCode,
      qu: item.countyCode,
    },
    name: item.receiver,
    phone: item.contact,
    postalCode: item.postalCode,
    detailAddress: item.address,
    addressTags: item.addressTags,
    boolearn: item.isDefault === 0,
  };
  setRegionList(item.provinceCode, item.cityCode);
};

// 设置表单为全空的值
const defaultFormModel = () => ({
  address: {
    sheng: "",
    shi: "",
    qu: "",
  },
  name: "",
  phone: "",
  postalCode: "",
  detailAddress: "",
  addressTags: "",
  boolearn: false,
});

const formModel = ref(defaultFormModel());
const formRef = ref();
const validateRequiredText = (message) => (rule, value, callback) => {
  if (!value?.trim()) callback(new Error(message));
  else callback();
};
const rules = {
  name: [{ validator: validateRequiredText("姓名不能为空"), trigger: "blur" }],

  phone: [
    {
      validator: (rule, value, callback) => {
        if (!value || !value.trim()) {
          callback(new Error("手机号不能为空"));
        } else if (!/^1[3-9]\d{9}$/.test(value)) {
          callback(new Error("请输入11位数字（第二位不能是1和2）"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],

  "address.sheng": [
    {
      required: true,
      message: "请选择省份",
      trigger: "change",
    },
  ],

  "address.shi": [
    {
      required: true,
      message: "请选择城市",
      trigger: "change",
    },
  ],

  "address.qu": [
    {
      required: true,
      message: "请选择区县",
      trigger: "change",
    },
  ],

  detailAddress: [{ validator: validateRequiredText("详细地址不能为空"), trigger: "blur" }],
};
// 进行判断，如果为true，点了就没反应。防止短时间多次点击
const submitLoading = ref(false);
// 添加收货地址
const addAddress = () => {
  if (submitLoading.value) return;
  // 进行判断校验是否全通过
  formRef.value.validate(async (valid) => {
    if (valid) {
      submitLoading.value = true;
      const addressData = {
        receiver: formModel.value.name,
        contact: formModel.value.phone,
        provinceCode: formModel.value.address.sheng,
        cityCode: formModel.value.address.shi,
        countyCode: formModel.value.address.qu,
        postalCode: formModel.value.postalCode,
        address: formModel.value.detailAddress,
        addressTags: formModel.value.addressTags,
        isDefault: formModel.value.boolearn ? 0 : 1,
        fullLocation: fullLocation.value,
      };

      try {
        if (isEditingAddress.value) {
          await editAddressAPI({ id: editingAddressId.value, ...addressData });
        } else {
          await addAddressAPI(addressData);
        }

        ElMessage.success(isEditingAddress.value ? "地址修改成功" : "地址添加成功");
        addFlag.value = false;
        await getCheckout();
        resetAddressForm();
      } finally {
        submitLoading.value = false;
      }
    } else {
      ElMessage.info("数据异常，请重新填写地址");
    }
  });
};

const showDialog = ref(false);
const addFlag = ref(false);

// 选择地址
// 选择的地址高亮
const activeAddress = ref({});
const switchItem = (item) => {
  activeAddress.value = item;
  console.log(item);
};
// 选择地址确定
const confirm = () => {
  if (activeAddress.value.id) {
    curAddress.value = activeAddress.value;
    showDialog.value = false;
  } else {
    showDialog.value = false;
  }
};
// 获取商品信息并跳转支付页面
const createOrder = async () => {
  const res = await createOrderAPI({
    deliveryTimeType: 1,
    payType: 1,
    payChannel: 1,
    buyerMessage: "",
    goods: checkInfo.value.goods.map((item) => {
      return {
        skuId: item.skuId,
        count: item.count,
      };
    }),
    addressId: curAddress.value.id,
  });
  const orderId = res.data.result.id;
  console.log(res);
  router.push(`pay/${orderId}`);
  cartStore.getCartList();
};

// 选择省市区
const shiList = ref([]);
const quList = ref([]);
const selectSheng = (num) => {
  setRegionList(num);
  formModel.value.address.shi = "";
  formModel.value.address.qu = "";
};

const selectShi = (num) => {
  setRegionList(formModel.value.address.sheng, num);
  formModel.value.address.qu = "";
};
// 按地区编码获取省、市、区名称，供表单和已有地址共用。
const getRegionFullLocation = (provinceCode, cityCode, countyCode) => {
  const province = regionData.find((item) => item.value === provinceCode);
  const city = province?.children.find((item) => item.value === cityCode);
  const county = city?.children.find((item) => item.value === countyCode);

  return `${province?.label || ""}${city?.label || ""}${county?.label || ""}`;
};
const getFullAddress = (item) => {
  return getRegionFullLocation(item.provinceCode, item.cityCode, item.countyCode);
};
const fullLocation = computed(() =>
  getRegionFullLocation(
    formModel.value.address.sheng,
    formModel.value.address.shi,
    formModel.value.address.qu,
  ),
);
// 打开添加地址清空表单数据内容
const addButton = () => {
  resetAddressForm();
  addFlag.value = true;
  nextTick(() => {
    formRef.value?.clearValidate();
  });
};
const resetAddressForm = () => {
  editingAddressId.value = null;
  formModel.value = defaultFormModel();
  shiList.value = [];
  quList.value = [];
  showCustomInput.value = false;
  customTag.value = "";
  formRef.value?.clearValidate();
};

const defaultTags = ["家", "公司"];

// 自定义标签输入框
const customTags = ref([]);
// 是否显示输入框
const showCustomInput = ref(false);
// 输入框内容
const customTag = ref("");
// 当前选中的标签
const selectTag = (tag) => {
  formModel.value.addressTags = tag;
};

// 添加自定义标签
const confirmCustomTag = () => {
  const tag = customTag.value.trim();
  // 空内容不添加
  if (!tag) return;
  customTags.value.push(tag);
  formModel.value.addressTags = tag;
  customTag.value = "";
  showCustomInput.value = false;
};
// 关闭adddialog前的操作
const closeAddDialog = (done) => {
  if (JSON.stringify(formModel.value) === JSON.stringify(defaultFormModel())) {
    done();
    return;
  }
  ElMessageBox.confirm("是否保存当前地址为草稿？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
  })
    .then(() => {
      done();
    })
    .catch(() => {
      formModel.value = defaultFormModel();
      shiList.value = [];
      quList.value = [];
      done();
    });
};

// 封装地区处理
const setRegionList = (provinceCode, cityCode) => {
  const province = regionData.find((item) => item.value === provinceCode);

  shiList.value = province?.children || [];

  const city = shiList.value.find((item) => item.value === cityCode);

  quList.value = city?.children || [];
};

const addressTags = computed(() => [...defaultTags, ...customTags.value]);
</script>

<template>
  <div class="xtx-pay-checkout-page">
    <div class="container checkout-loading" v-if="checkoutLoading"><DataLoading label="正在载入结算信息" /></div>
    <div v-else-if="checkInfo">
    <div class="container">
      <div class="wrapper">
        <!-- 收货地址 -->
        <h3 class="box-title">收货地址</h3>
        <div class="box-body">
          <div class="address">
            <div class="text">
              <div class="none" v-if="!curAddress">您需要先添加收货地址才可提交订单。</div>
              <ul v-else>
                <li>
                  <span>收<i />货<i />人：</span>{{ curAddress.receiver }}
                </li>
                <li><span>联系方式：</span>{{ curAddress.contact }}</li>
                <li>
                  <span>收货地址：</span>{{ getFullAddress(curAddress) }} {{ curAddress.address }}
                </li>
              </ul>
            </div>
            <div class="action">
              <el-button size="large" @click="showDialog = true">切换地址</el-button>
              <el-button size="large" @click="addButton">添加地址</el-button>
            </div>
          </div>
        </div>
        <!-- 商品信息 -->
        <h3 class="box-title">商品信息</h3>
        <div class="box-body">
          <table class="goods">
            <thead>
              <tr>
                <th width="520">商品信息</th>
                <th width="170">单价</th>
                <th width="170">数量</th>
                <th width="170">小计</th>
                <th width="170">实付</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="i in checkInfo?.goods" :key="i.id">
                <td>
                  <a href="javascript:;" class="info">
                    <img :src="i.picture" alt="" />
                    <div class="right">
                      <p>{{ i.name }}</p>
                      <p>{{ i.attrsText }}</p>
                    </div>
                  </a>
                </td>
                <td>&yen;{{ i.price }}</td>
                <td>{{ i.count }}</td>
                <td>&yen;{{ i.totalPrice }}</td>
                <td>&yen;{{ i.totalPayPrice }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 配送时间 -->
        <h3 class="box-title">配送时间</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">不限送货时间：周一至周日</a>
          <a class="my-btn" href="javascript:;">工作日送货：周一至周五</a>
          <a class="my-btn" href="javascript:;">双休日、假日送货：周六至周日</a>
        </div>
        <!-- 支付方式 -->
        <h3 class="box-title">支付方式</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">在线支付</a>
          <a class="my-btn" href="javascript:;">货到付款</a>
          <span style="color: var(--color-text-muted)">货到付款需付5元手续费</span>
        </div>
        <!-- 金额明细 -->
        <h3 class="box-title">金额明细</h3>
        <div class="box-body">
          <div class="total">
            <dl>
              <dt>商品件数：</dt>
              <dd>{{ checkInfo.summary?.goodsCount }}件</dd>
            </dl>
            <dl>
              <dt>商品总价：</dt>
              <dd>¥{{ checkInfo.summary?.totalPrice.toFixed(2) }}</dd>
            </dl>
            <dl>
              <dt>运<i></i>费：</dt>
              <dd>¥{{ checkInfo.summary?.postFee.toFixed(2) }}</dd>
            </dl>
            <dl>
              <dt>应付总额：</dt>
              <dd class="price">{{ checkInfo.summary?.totalPayPrice.toFixed(2) }}</dd>
            </dl>
          </div>
        </div>
        <!-- 提交订单 -->
        <div class="submit">
          <el-button @click="createOrder" type="primary" size="large">提交订单</el-button>
        </div>
      </div>
    </div>
    </div>
  </div>
  <!-- 切换地址 -->
  <el-dialog v-model="showDialog" title="切换收货地址" width="400" center>
    <div class="addressWrapper">
      <div
        class="text item"
        :class="{ active: item.id === activeAddress.id }"
        @click="switchItem(item)"
        v-for="item in checkInfo.userAddresses"
        :key="item.id"
      >
        <ul>
          <li>
            <span>收<i />货<i />人：</span>{{ item.receiver }}
          </li>
          <li><span>联系方式：</span>{{ item.contact }}</li>
          <li><span>收货地址：</span>{{ getFullAddress(item) + item.address }}</li>
        </ul>
        <div class="address-action">
          <el-icon class="delete" @click.stop="delAddress(item.id)">
            <Close />
          </el-icon>

          <el-icon class="edit" @click.stop="editAddress(item)">
            <Edit />
          </el-icon>
        </div>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showDialog = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 添加地址 -->
  <el-dialog
    v-model="addFlag"
    :title="isEditingAddress ? '编辑收货地址' : '添加收货地址'"
    width="60%"
    :before-close="closeAddDialog"
  >
    <el-form ref="formRef" :model="formModel" :rules="rules">
      <el-form-item label="请填写您的姓名：" prop="name">
        <el-input v-model="formModel.name"></el-input>
      </el-form-item>
      <el-form-item label="请填写您手机号：" prop="phone">
        <el-input
          @input="formModel.phone = formModel.phone.replace(/\D/g, '')"
          v-model="formModel.phone"
        ></el-input>
      </el-form-item>
      <el-form-item label="请填写您的地址：" prop="address.sheng">
        <el-col :span="6">
          <el-select placeholder="省" v-model="formModel.address.sheng" @change="selectSheng">
            <el-option
              v-for="item in regionData"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-select
            placeholder="市"
            v-model="formModel.address.shi"
            @change="selectShi"
            :disabled="!shiList?.length"
          >
            <el-option
              v-for="item in shiList"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="10">
          <el-select placeholder="区" v-model="formModel.address.qu" :disabled="!quList.length">
            <el-option
              v-for="item in quList"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="门牌号：" prop="detailAddress">
        <el-input type="textarea" v-model="formModel.detailAddress"></el-input>
      </el-form-item>
      <el-form-item label="是否设为默认地址">
        <el-switch v-model="formModel.boolearn"></el-switch>
      </el-form-item>
      <el-form-item label="地址标签">
        <el-button
          v-for="item in addressTags"
          :key="item"
          :type="formModel.addressTags === item ? 'primary' : ''"
          @click="selectTag(item)"
          >{{ item }}</el-button
        >
        <el-button v-if="!showCustomInput" @click="showCustomInput = true">+其他</el-button>
        <template v-else>
          <el-input v-model="customTag" placeholder="请输入标签" style="width: 150px" />
          <el-button type="primary" @click="confirmCustomTag">确定</el-button>
        </template>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer" style="display: flex; justify-content: center">
        <el-button @click="addFlag = false">取消</el-button>
        <el-button type="primary" :loading="submitLoading" @click="addAddress">
          {{ isEditingAddress ? "保存修改" : "确定" }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.xtx-pay-checkout-page {
  margin-top: 20px;
  .checkout-loading { position: relative; height: 560px; }

  .wrapper {
    background: var(--color-card-bg);
    padding: 0 20px;

    .box-title {
      font-size: 16px;
      font-weight: normal;
      padding-left: 10px;
      line-height: 70px;
      border-bottom: 1px solid var(--color-border);
    }

    .box-body {
      padding: 20px 0;
    }
  }
}

/* 收货地址 */
.address {
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;

  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;

    .none {
      line-height: 90px;
      color: var(--color-text-muted);
      text-align: center;
      width: 100%;
    }

    > ul {
      flex: 1;
      padding: 20px;

      li {
        line-height: 30px;

        span {
          color: var(--color-text-muted);
          margin-right: 5px;

          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }

    > a {
      color: $xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid var(--color-border);
    }
  }

  .action {
    width: 420px;
    text-align: center;

    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;

      &:first-child {
        margin-right: 10px;
      }
    }
  }
}

/* 地址弹窗 */
.addressWrapper {
  max-height: 500px;
  overflow-y: auto;
}

.text {
  flex: 1;
  min-height: 90px;
  display: flex;
  align-items: center;

  &.item {
    position: relative;
    border: 1px solid var(--color-border);
    margin-bottom: 10px;
    padding-right: 50px;
    cursor: pointer;

    &.active,
    &:hover {
      border-color: $xtxColor;
      background: lighten($xtxColor, 50%);
    }

    > ul {
      padding: 10px;
      font-size: 14px;
      line-height: 30px;
    }

    .address-action {
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);

      display: flex;
      flex-direction: column;
      gap: 10px;

      .delete,
      .edit {
        font-size: 26px;
        cursor: pointer;
        color: var(--color-text-muted);
      }

      .delete:hover,
      .edit:hover {
        color: var(--color-text-main);
      }
    }
  }
}

/* 商品 */
.goods {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;

  .info {
    display: flex;
    text-align: left;

    img {
      width: 70px;
      height: 70px;
      margin-right: 20px;
    }

    .right {
      line-height: 24px;

      p {
        &:last-child {
          color: var(--color-text-muted);
        }
      }
    }
  }

  tr {
    th {
      background: rgba(20, 30, 50, 0.9);
      font-weight: normal;
    }

    td,
    th {
      text-align: center;
      padding: 20px;

      border-bottom: 1px solid var(--color-border);

      &:first-child {
        border-left: 1px solid var(--color-border);
      }

      &:last-child {
        border-right: 1px solid var(--color-border);
      }
    }
  }
}

/* 按钮 */
.my-btn {
  width: 228px;

  height: 50px;

  border: 1px solid #e4e4e4;

  text-align: center;

  line-height: 48px;

  margin-right: 25px;

  color: var(--color-text-muted);

  display: inline-block;

  &.active,
  &:hover {
    border-color: $xtxColor;
  }
}

/* 金额 */
.total {
  dl {
    display: flex;

    justify-content: flex-end;

    line-height: 50px;

    dt {
      i {
        display: inline-block;
        width: 2em;
      }
    }

    dd {
      width: 240px;

      text-align: right;

      padding-right: 70px;

      &.price {
        font-size: 20px;

        color: $priceColor;
      }
    }
  }
}

/* 提交 */
.submit {
  text-align: right;

  padding: 60px;

  border-top: 1px solid var(--color-border);
}
</style>
