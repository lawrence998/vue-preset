<template>
  <div class="page page-hello">
    <div class="page-content">
      <!-- 静态资源路径写法事例 -->
      <img src="~@assets/img/logo.png">
      <h1 v-text="msg"></h1>
      <h2 v-text="message"></h2>
      <svg-icon icon-class="cat"></svg-icon>
      <div class="demo">
        <h3>方法示例</h3>
        <pre>
          &lt;template&gt;
            &lt;div class=&quot;page page-hello&quot;&gt;
              &lt;!-- 静态资源路径写法事例 --&gt;
              &lt;img src=&quot;~@assets/images/copyfiles/logo.png&quot;&gt;
              &lt;p v-text=&quot;msg&quot;&gt;&lt;/p&gt;
            &lt;/div&gt;
          &lt;/template&gt;

          &lt;script lang=&quot;ts&quot;&gt;
            /**
             * 以下仅为事例代码，可以随意扩展修改
             */
            import {Component, Vue} from &#x27;vue-property-decorator&#x27;;
            // 工具类
            import {formatDate} from &#x27;utils&#x27;;

            @Component
            export default class Hello extends Vue {
              private msg: string = &#x27;Welcome to Your Vue.js + TypeScript App&#x27;;
              private message: string = &#x60;现在时间是：${formatDate(Date.now())}&#x60;;

              private created() {
                this.movieComingSoon();
                this.mockTest();
                this.cacheTest();
              }

              private async movieComingSoon() {
                try {
                  const res = await getTest();
                  console.log(&#x27;movieComingSoon-res: &#x27;, res);
                } catch (error) {
                  console.log(&#x27;movieComingSoon-error: &#x27;, error);
                }
              }

              private async mockTest() {
                try {
                  const res = await getDemo();
                  console.log(&#x27;res: &#x27;, res);
                } catch (error) {
                  console.log(&#x27;error: &#x27;, error);
                }
              }

              private async cacheTest() {
                try {
                  const res = await getCache();
                  console.log(&#x27;cacheTest-res: &#x27;, res);
                } catch (error) {
                  console.log(&#x27;cacheTest-error: &#x27;, error);
                }
              }

            }
          &lt;/script&gt;

          &lt;style lang=&quot;less&quot; rel=&quot;stylesheet/less&quot;&gt;
            @import &quot;./style.less&quot;;
          &lt;/style&gt;
        </pre>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  /**
   * 以下仅为事例代码，可以随意扩展修改
   */
  import { Component, Vue } from 'vue-property-decorator';
  // 工具类
  import { formatDate } from 'utils';
  import { getDemo, getTest, getCache } from 'services/api';

  @Component
  export default class Hello extends Vue {
    private msg = 'Welcome to Your Vue.js + TypeScript App';
    private message = `现在时间是：${formatDate(Date.now())}`;

    private created() {
      this.movieComingSoon();
      this.mockTest();
      this.cacheTest();
    }

    private async movieComingSoon() {
      try {
        const res = await getTest();
        console.log('movieComingSoon-res: ', res);
      } catch (error) {
        console.log('movieComingSoon-error: ', error);
      }
    }

    private async mockTest() {
      try {
        const res = await getDemo();
        console.log('res: ', res);
      } catch (error) {
        console.log('error: ', error);
      }
    }

    private async cacheTest() {
      try {
        const res = await getCache();
        console.log('cacheTest-res: ', res);
      } catch (error) {
        console.log('cacheTest-error: ', error);
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import "./style.less";
</style>
