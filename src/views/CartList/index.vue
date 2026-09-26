<script setup>
import { useCartStore } from "@/stores/cartStore";
import { useRouter } from "vue-router";
import DataLoading from "@/components/DataLoading.vue";

const cartStore = useCartStore();
const cartList = cartStore.cartList;
const router = useRouter();
const change = (i) => {
  cartStore.updateCart(i);
};
</script>

<template>
  <div class="xtx-cart-page">
    <div class="container m-top-20">
      <div class="cart" :class="{ 'is-loading': cartStore.loading }">
        <div class="cart-loading" v-if="cartStore.loading"><DataLoading label="正在载入购物车" /></div>
        <table>
          <thead>
            <tr>
              <th width="120">
                <el-checkbox
                  :disabled="cartList.length === 0"
                  :model-value="cartStore.isAll"
                  @change="cartStore.changeAll"
                />
              </th>
              <th width="400">商品信息</th>
              <th width="220">单价</th>
              <th width="180">数量</th>
              <th width="180">小计</th>
              <th width="140">操作</th>
            </tr>
          </thead>
          <!-- 商品列表 -->
          <tbody>
            <tr v-for="i in cartList" :key="i.id">
              <td>
                <el-checkbox v-model="i.selected" @change="change(i)" />
              </td>
              <td>
                <div class="goods">
                  <RouterLink to="/"><img :src="i.picture" alt="" /></RouterLink>
                  <div>
                    <p class="name ellipsis">
                      {{ i.name }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>&yen;{{ i.price }}</p>
              </td>
              <td class="tc">
                <el-input-number :min="1" v-model="i.count" />
              </td>
              <td class="tc">
                <p class="f16 red">&yen;{{ (i.price * i.count).toFixed(2) }}</p>
              </td>
              <td class="tc">
                <p>
                  <el-popconfirm
                    title="确认删除吗?"
                    confirm-button-text="确认"
                    cancel-button-text="取消"
                    @confirm="cartStore.delCart(i.skuId)"
                  >
                    <template #reference>
                      <a href="javascript:;">删除</a>
                    </template>
                  </el-popconfirm>
                </p>
              </td>
            </tr>
            <tr v-if="cartList.length === 0">
              <td colspan="6">
                <div class="cart-none">
                  <el-empty description="购物车列表为空">
                    <el-button type="primary">随便逛逛</el-button>
                  </el-empty>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 操作栏 -->
      <div class="action">
        <div class="batch">
          共 {{ cartStore.count }} 件商品，已选择 {{ cartStore.checkedNum }} 件，商品合计：
          <span class="red">¥ {{ cartStore.checkedPrice.toFixed(2) }} </span>
        </div>
        <div class="total">
          <el-button size="large" type="primary" :disabled="cartStore.checkedNum === 0" @click="router.push('/checkout')"
            >下单结算</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.xtx-cart-page {
  margin-top: 20px;

  .cart {
    position: relative;
    background: var(--color-card-bg);
    color: var(--color-text-muted);

    &.is-loading {
      min-height: var(--small-loading-height);

      table { display: none; }
    }

    .cart-loading {
      position: absolute;
      z-index: 2;
      inset: 0;
      min-height: var(--small-loading-height);
      overflow: hidden;
      border: 1px solid rgba(0, 184, 255, 0.16);
      border-radius: 5px;
      background: rgba(8, 12, 24, 0.92);
    }

    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;

      th,
      td {
        padding: 10px;
        border-bottom: 1px solid var(--color-border);

        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: var(--color-text-muted);
        }
      }

      th {
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }
    }
  }

  .cart-none {
    text-align: center;
    padding: 120px 0;
    background: var(--color-card-bg);

    p {
      color: var(--color-text-muted);
      padding: 20px 0;
    }
  }

  .tc {
    text-align: center;

    a {
      color: $xtxColor;
    }

    .xtx-numbox {
      margin: 0 auto;
      width: 120px;
    }
  }

  .red {
    color: $priceColor;
  }

  .green {
    color: $xtxColor;
  }

  .f16 {
    font-size: 16px;
  }

  .goods {
    display: flex;
    align-items: center;

    img {
      width: 100px;
      height: 100px;
    }

    > div {
      width: 280px;
      font-size: 16px;
      padding-left: 10px;

      .attr {
        font-size: 14px;
        color: var(--color-text-muted);
      }
    }
  }

  .action {
    display: flex;
    background: var(--color-card-bg);
    margin-top: 20px;
    height: 80px;
    align-items: center;
    font-size: 16px;
    justify-content: space-between;
    padding: 0 30px;

    .xtx-checkbox {
      color: var(--color-text-muted);
    }

    .batch {
      a {
        margin-left: 20px;
      }
    }

    .red {
      font-size: 18px;
      margin-right: 20px;
      font-weight: bold;
    }
  }

  .tit {
    color: var(--color-text-muted);
    font-size: 16px;
    font-weight: normal;
    line-height: 50px;
  }
}
</style>
