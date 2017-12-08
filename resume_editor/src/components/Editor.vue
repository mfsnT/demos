<template>
  <section class="editor">
    <!-- 按钮 -->
    <ul class="tabs-btn">
      <li v-for="i in indexArr"
          @click="choose(i)"
          :class="{ active: currentIndex === i }">
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="`#icon-${ iconClassArr[i] }`"></use>
        </svg>
      </li>
    </ul>

    <!-- 编辑输入 -->
    <ul class="editor-panel">
      <li v-for="i in indexArr" v-show="currentIndex === i">
          <!-- 个人信息 -->
          <el-form v-if="i === 0">
            <h2>个人信息</h2>
            <div class="input-group">
              <el-form-item label="姓名：">
                 <el-input v-model="profile.personalInformation.name"></el-input>
              </el-form-item>

              <el-form-item label="出生日期：">
                <el-input v-model="profile.personalInformation.birthday"></el-input>
              </el-form-item>

              <el-form-item label="性别：">
                <el-input v-model="profile.personalInformation.sex"></el-input>
              </el-form-item>

              <el-form-item label="目前状态：">
                <el-input v-model="profile.personalInformation.currentStatus"></el-input>
              </el-form-item>

              <el-form-item label="工作年限：">
                <el-input v-model="profile.personalInformation.workingYears"></el-input>
              </el-form-item>

              <el-form-item label="所在城市：">
                <el-input v-model="profile.personalInformation.liveCity"></el-input>
              </el-form-item>

              <el-form-item label="期望城市：">
                <el-input v-model="profile.personalInformation.expectCity"></el-input>
              </el-form-item>

              <el-form-item label="期望职位：">
                <el-input v-model="profile.personalInformation.expectPosition"></el-input>
              </el-form-item>
            </div>
          </el-form>
          
          <!-- 工作情况 -->
          <el-form v-else-if="i === 1">
            <h2>工作经历</h2>
            <div class="input-group" v-for="(item, index) in profile.work">
              <el-form-item label="工作时间：">
                <el-input v-model="item.time"></el-input>
              </el-form-item>

              <el-form-item label="公司名称：">
                <el-input v-model="item.company"></el-input>
              </el-form-item>

              <el-form-item label="项目经历：">
                <el-input type="textarea" v-model="item.project"></el-input>
              </el-form-item>
              <i class="el-icon-circle-close" @click="removeItem(i, index)"></i>
            </div>
            <el-button type="primary" round @click="addItem(i)">添加</el-button>
          </el-form>
          
          <!-- 教育情况 -->
          <el-form v-else-if="i === 2">
            <h2>教育情况</h2>
            <div class="input-group" v-for="(item, index) in profile.education">
              <el-form-item label="教育时间：">
                <el-input v-model="item.time"></el-input>
              </el-form-item>

              <el-form-item label="教育经历：">
                <el-input v-model="item.school"></el-input>
              </el-form-item>

              <el-form-item label="教育经历：">
                <el-input type="textarea" v-model="item.situation"></el-input>
              </el-form-item>
              <i class="el-icon-circle-close" @click="removeItem(i, index)"></i>
            </div>
            <el-button type="primary" round @click="addItem(i)">添加</el-button>
          </el-form>
          
          <!-- 爱好 -->
          <el-form v-else-if="i === 3">
            <h2>个人爱好</h2>
            <div class="input-group" v-for="(item, index) in profile.hobbies">
              <el-form-item label="爱好：">
                <el-input v-model="item.hobby"></el-input>
              </el-form-item>
              <i class="el-icon-circle-close" @click="removeItem(i, index)"></i>
            </div>
            <el-button type="primary" round @click="addItem(i)">添加</el-button>
          </el-form>
          
          <!-- 获奖情况 -->
          <el-form v-else-if="i === 4">
            <h2>获奖情况</h2>
            <div class="input-group" v-for="(item, index) in profile.prize">
              <el-form-item label="获奖名称：">
                <el-input v-model="item.name"></el-input>
              </el-form-item>

              <el-form-item label="获奖描述：">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <i class="el-icon-circle-close" @click="removeItem(i, index)"></i>
            </div>
            <el-button type="primary" round @click="addItem(i)">添加</el-button>
          </el-form>
          
          <!-- 联系方式 -->
          <el-form v-else>
            <h2>联系方式</h2>
            <div class="input-group">
              <el-form-item label="电话：">
                <el-input v-model="profile.contact.phone"></el-input>
              </el-form-item>

              <el-form-item label="邮箱：">
                <el-input v-model="profile.contact.email"></el-input>
              </el-form-item>
            </div>
          </el-form>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  data() {
    return {
      iconClassArr: ['message', 'work', 'book', '13', 'jiangbei', 'icon26'],
      indexArr: [0, 1, 2, 3, 4, 5],
      currentIndex: 0,
    }
  },
  methods: {
    choose(i) {
      this.currentIndex = i
    },
    // 增加项
    addItem(index) {
      this.$store.commit('ADD_ITEM', index)
    },
    // 移除项
    removeItem(i1, i2) {
      this.$store.commit('REMOVE_ITEM', {i1, i2})
    }
  },
  computed: {
    profile() {
      return this.$store.state.profile
    }
  }
}
</script>

<style lang="less">
.editor {
  width: 450px;
  margin-right: 10px;
  display: flex;

  .tabs-btn {
    width: 80px;
    background-color: #409EFF;
    padding-top: 10px;

    li {
      height: 55px;
      line-height: 55px;
      text-align: center;
      cursor: pointer;

      .icon {
        font-size: 25px;
        fill: #fff;
      }
    }

    .active {
      background-color: #fff;

      .icon {
        fill: #409EFF;
      }
    }
  }

  .editor-panel {
    flex: 1;
    height: 100%;
    overflow: hidden;

    li {
      overflow: auto;
      height: 100%;
      padding: 18px 12px 0 12px;
      
      form {
        padding-bottom: 18px;
        text-align: center;

        h2 {
          text-align: left;
          padding-bottom: 12px;
        }

        .input-group {
          padding: 0 6px;
          box-shadow: 0 0 0 #ccc;
          transition: box-shadow .3s;
        }

        .input-group:hover {
          box-shadow: 0 0 6px #ccc;
        }
      }
    }

    > li:nth-child(2),
    > li:nth-child(3),
    > li:nth-child(4),
    > li:nth-child(5) {
      form {

        .input-group {
          position: relative;

          i {
            position: absolute;
            right: -8px;
            top: -8px;
            cursor: pointer;
            opacity: 0;
            transition: opacity .3s linear;
          }
        }

        .input-group:hover {
          i {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>