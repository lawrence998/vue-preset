<template>
  <div class="page page-hello">
    <div class="page-content">
      <!-- 静态资源路径写法事例 -->
      <img src="~@assets/img/logo.png">
      <h1 v-text="msg"></h1>
      <h2 v-text="message"></h2>
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
          &lt;script&gt;
            /**
            * 以下仅为事例代码，可以随意扩展修改
            */

            // 工具类
            import {formatDate} from &#x27;utils&#x27;;

            export default {
              data() {
                return {
                  msg: &#x27;Welcome to Your Vue.js App&#x27;,
                }
              },
              created() {
                this.movieComingSoon();
                this.mockTest();
                this.cacheTest();
              },
              methods: {
                async movieComingSoon () {
                  try {
                    const res = await getTest();
                    console.log(&#x27;movieComingSoon-res: &#x27;, res);
                  } catch (error) {
                    console.log(&#x27;movieComingSoon-error: &#x27;, error);
                  }
                },

                async mockTest() {
                  try {
                    const res = await getDemo();
                    console.log(&#x27;res: &#x27;, res);
                  } catch (error) {
                    console.log(&#x27;error: &#x27;, error);
                  }
                },

                async cacheTest() {
                  try {
                    const res = await getCache();
                    console.log(&#x27;cacheTest-res: &#x27;, res);
                  } catch (error) {
                    console.log(&#x27;cacheTest-error: &#x27;, error);
                  }
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

<script>
  /**
   * 以下仅为事例代码，可以随意扩展修改
   */
  // 工具类
  import { formatDate } from 'utils';
  import { getDemo, getTest, getCache } from 'services/api';

  export default {
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        message: '现在时间是：' + formatDate(Date.now())
      };
    },

    created () {
      this.movieComingSoon();
      this.mockTest();
      this.cacheTest();
    },

    methods: {
      async movieComingSoon () {
        try {
          const res = await getTest();
          console.log('movieComingSoon-res: ', res);
        } catch (error) {
          console.log('movieComingSoon-error: ', error);
        }
      },

      async mockTest() {
        try {
          const res = await getDemo();
          console.log('res: ', res);
        } catch (error) {
          console.log('error: ', error);
        }
      },

      async cacheTest() {
        try {
          const res = await getCache();
          console.log('cacheTest-res: ', res);
        } catch (error) {
          console.log('cacheTest-error: ', error);
        }
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  @import "./style.less";
</style>
