<script setup>
import { getGoodsAPI } from "@/api/detail";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import DetailHot from "./components/DetailHot.vue";
import { ElMessage } from "element-plus";
import { useCartStore } from "@/stores/cartStore.js";
import DataLoading from "@/components/DataLoading.vue";

const goodsList = ref({});
const loading = ref(true);
const hotRequestsFinished = ref(0);
const pageLoading = computed(
  () => loading.value || (Boolean(goodsList.value.details) && hotRequestsFinished.value < 2),
);
const route = useRoute();
const onHotLoaded = () => {
  hotRequestsFinished.value += 1;
};
const getGoodList = async () => {
  try {
    const res = await getGoodsAPI(route.params.id);
    goodsList.value = res.data.result;
  } finally {
    loading.value = false;
  }
};

// sku给操作时
let skuObj = {};
const skuChange = (sku) => {
  skuObj = sku;
};
onMounted(() => getGoodList());
// count变化
const count = ref(1);
const countChange = () => {
  console.log(count.value);
};
// 购物车
const cartStore = useCartStore();
const addCart = async () => {
  if (skuObj.skuId) {
    await cartStore.addCart({
      skuId: skuObj.skuId,
      count: count.value,
      id: goodsList.value.id,
      name: goodsList.value.name,
      picture: goodsList.value.mainPictures[0],
      price: goodsList.value.price,
      attrsText: skuObj.specsText,
      selected: true,
    });

    ElMessage.success("添加成功");
  } else {
    ElMessage.warning("请选择规格");
  }
};
</script>

<template>
  <div class="xtx-goods-page">
    <div class="container">
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item
            v-if="goodsList.categories?.[1]"
            :to="{ path: `/category/${goodsList.categories[1].id}` }"
            >{{ goodsList.categories?.[1].name }}
          </el-breadcrumb-item>
          <el-breadcrumb-item
            v-if="goodsList.categories?.[0]"
            :to="{ path: `/category/sub/${goodsList.categories[0].id}` }"
            >{{ goodsList.categories?.[0].name }}
          </el-breadcrumb-item>
          <el-breadcrumb-item>{{ goodsList.name || "商品详情" }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div v-if="pageLoading" class="detail-loading-area">
        <DataLoading active label="正在载入商品详情" />
      </div>
    </div>
    <div class="container" v-if="goodsList.details" v-show="!pageLoading">
      <!-- 商品信息 -->
      <div class="info-container">
        <div>
          <div class="goods-info">
            <div class="media">
              <!-- 图片预览区 -->
              <ImageView :imageList="goodsList.mainPictures"></ImageView>
              <!-- 统计数量 -->
              <ul class="goods-sales">
                <li>
                  <p>销量人气</p>
                  <p>{{ goodsList.salesCount }}</p>
                  <p><i class="iconfont icon-task-filling"></i>销量人气</p>
                </li>
                <li>
                  <p>商品评价</p>
                  <p>{{ goodsList.commentCount }}</p>
                  <p><i class="iconfont icon-comment-filling"></i>查看评价</p>
                </li>
                <li>
                  <p>收藏人气</p>
                  <p>{{ goodsList.collectCount }}</p>
                  <p><i class="iconfont icon-favorite-filling"></i>收藏商品</p>
                </li>
                <li>
                  <p>品牌信息</p>
                  <p v-if="goodsList.brand?.name">{{ goodsList.brand.name }}</p>
                  <p v-else class="no-brand">这个商家很懒<br />什么也没留下</p>
                  <p><i class="iconfont icon-dynamic-filling"></i>品牌主页</p>
                </li>
              </ul>
            </div>
            <div class="spec">
              <!-- 商品信息区 -->
              <p class="g-name">{{ goodsList.name }}</p>
              <p class="g-desc">{{ goodsList.desc }}</p>
              <p class="g-price">
                <span>{{ goodsList.price }}</span>
                <span>{{ goodsList.oldPrice }}</span>
              </p>
              <div class="g-service">
                <dl>
                  <dt>促销</dt>
                  <dd>12月好物放送，App领券购买直降120元</dd>
                </dl>
                <dl>
                  <dt>服务</dt>
                  <dd>
                    <span>无忧退货</span>
                    <span>快速退款</span>
                    <span>免费包邮</span>
                    <a href="javascript:;">了解详情</a>
                  </dd>
                </dl>
              </div>
              <!-- sku组件 -->
              <XtxSku :goods="goodsList" @change="skuChange"></XtxSku>
              <!-- 数据组件 -->
              <el-input-number v-model="count" :min="1" @change="countChange" />
              <!-- 按钮组件 -->
              <div>
                <el-button size="large" class="btn" @click="addCart"> 加入购物车 </el-button>
              </div>
            </div>
          </div>
          <div class="goods-footer">
            <div class="goods-article">
              <!-- 商品详情 -->
              <div class="goods-tabs">
                <nav>
                  <a>商品详情</a>
                </nav>
                <div class="goods-detail">
                  <!-- 属性 -->
                  <ul class="attrs">
                    <li v-for="item in goodsList.details.properties" :key="item.value">
                      <span class="dt">{{ item.name }}</span>
                      <span class="dd">{{ item.value }}</span>
                    </li>
                  </ul>
                  <!-- 图片 -->
                  <img
                    v-for="img in goodsList.details.pictures"
                    :key="img"
                    v-img-lazy="img"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <!-- 24热榜+专题推荐 -->
            <div class="goods-aside">
              <DetailHot title="24小时热销榜" :hotType="1" @loaded="onHotLoaded"></DetailHot>
              <DetailHot title="周热销榜" :hotType="2" @loaded="onHotLoaded"></DetailHot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.xtx-goods-page {
  .detail-loading-area {
    position: relative;
    height: var(--small-loading-height);
    margin-top: 12px;
    overflow: hidden;
    border: 1px solid rgba(0, 184, 255, 0.16);
    border-radius: 5px;
    background: transparent;
  }

  .goods-info {
    min-height: 600px;
    background: var(--color-card-bg);
    display: flex;

    .media {
      width: 580px;
      height: 600px;
      padding: 30px 50px;
    }

    .spec {
      flex: 1;
      padding: 30px 30px 30px 0;
    }
  }

  .goods-footer {
    display: flex;
    margin-top: 20px;

    .goods-article {
      width: 940px;
      margin-right: 20px;
    }

    .goods-aside {
      width: 280px;
      min-height: 1000px;
    }
  }

  .goods-tabs {
    min-height: 600px;
    background: var(--color-card-bg);
  }

  .goods-warn {
    min-height: 600px;
    background: var(--color-card-bg);
    margin-top: 20px;
  }

  .number-box {
    display: flex;
    align-items: center;

    .label {
      width: 60px;
      color: var(--color-text-muted);
      padding-left: 10px;
    }
  }

  .g-name {
    font-size: 22px;
  }

  .g-desc {
    color: var(--color-text-muted);
    margin-top: 10px;
  }

  .g-price {
    margin-top: 10px;

    span {
      &::before {
        content: "¥";
        font-size: 14px;
      }

      &:first-child {
        color: $priceColor;
        margin-right: 10px;
        font-size: 22px;
      }

      &:last-child {
        color: var(--color-text-muted);
        text-decoration: line-through;
        font-size: 16px;
      }
    }
  }

  .g-service {
    background: rgba(20, 30, 50, 0.9);
    width: 500px;
    padding: 20px 10px 0 10px;
    margin-top: 10px;

    dl {
      padding-bottom: 20px;
      display: flex;
      align-items: center;

      dt {
        width: 50px;
        color: var(--color-text-muted);
      }

      dd {
        color: var(--color-text-muted);

        &:last-child {
          span {
            margin-right: 10px;

            &::before {
              content: "•";
              color: $xtxColor;
              margin-right: 2px;
            }
          }

          a {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .goods-sales {
    display: flex;
    width: 400px;
    align-items: center;
    text-align: center;
    height: 140px;

    li {
      flex: 1;
      position: relative;

      ~ li::after {
        position: absolute;
        top: 10px;
        left: 0;
        height: 60px;
        border-left: 1px solid #e4e4e4;
        content: "";
      }

      p {
        &:first-child,
        .no {
          color: var(--color-text-muted);
        }

        &:nth-child(2) {
          color: $priceColor;
          margin-top: 10px;
        }

        &:last-child {
          color: var(--color-text-muted);
          margin-top: 10px;

          i {
            color: $xtxColor;
            font-size: 14px;
            margin-right: 2px;
          }

          &:hover {
            color: $xtxColor;
            cursor: pointer;
          }
        }
        &.no-brand {
          color: var(--color-text-muted);
        }
      }
    }
  }
}

.goods-tabs {
  min-height: 600px;
  background: var(--color-card-bg);

  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid var(--color-border);

    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;

      > span {
        color: $priceColor;
        font-size: 16px;
        margin-left: 10px;
      }
    }
  }
}

.goods-detail {
  padding: 40px;

  .attrs {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;

    li {
      display: flex;
      margin-bottom: 10px;
      width: 50%;

      .dt {
        width: 100px;
        color: var(--color-text-muted);
      }

      .dd {
        flex: 1;
        color: var(--color-text-muted);
      }
    }
  }

  > img {
    width: 100%;
  }
}

.btn {
  margin-top: 20px;
}

.bread-container {
  padding: 25px 0;
}
</style>
