<template>
<div>
    <div>
      <b-jumbotron bg-variant="success" class="mt-3">
        <template v-slot:header>基于即时实体协作云平台</template>

        <template v-slot:lead>
              将团队成员的思路·观点·创意·想法·知识等进行直观表达，
              并基于云进行现场式呈现，并支持协同创作，
              为企业、团队的远程协作带来面对面的现场效果，提升工作效率的同时，降低运营成本。
              广泛应用于日常沟通协作、会议、研讨、网络教学、知识管理等场景
        </template>
        <b-button variant="primary" href="/?dou=welcome_new_user">立即体验</b-button>
        <b-button variant="secondary" href="#scenarios">使用场景</b-button>
      </b-jumbotron>
    </div>


    <b-card-group deck>
        <b-card title="在家办公" img-src="https://mlib.liuzijin.com/frontend/images/homeoffice.webp" img-alt="Image" img-top>
        <a href="#scenarios"></a>
          <b-card-text>
          与同事一起使用云白板，像现场工作一样顺畅协作
          </b-card-text>
        </b-card>
        <b-card title="公司会议" img-src="https://mlib.liuzijin.com/frontend/images/meetingroom.webp" img-alt="Image" img-top>
          <b-card-text>
          即时交互式会议沟通，节省时间·空间，节省运营成本
          </b-card-text>
        </b-card>

        <b-card title="培训与教学" img-src="https://mlib.liuzijin.com/frontend/images/classroom.webp" img-alt="Image" img-top>
          <b-card-text>
          云白板替代黑板，培训教学效果更佳
          </b-card-text>
        </b-card>
        <b-card title="知识内容管理" img-src="https://mlib.liuzijin.com/frontend/images/km.webp" img-alt="Image" img-top>
          <b-card-text>
          知识内容整理更便捷。内置协作式脑图/待办功能
          </b-card-text>
        </b-card>
        </b-card-group>
    <b-card-group deck class="mt-3">

        <b-card title="研讨会" img-src="https://mlib.liuzijin.com/frontend/images/brainstorming.webp" img-alt="Image" img-bottom>
          <b-card-text>
          线上方式举行Design Thinking研讨会，云白板功能充分支持
          </b-card-text>
        </b-card>
        <b-card title="头脑风暴" img-src="https://mlib.liuzijin.com/frontend/images/discussion.webp" img-alt="Image" img-bottom>
          <b-card-text>
          在电脑上一起写写画画，实时同步保存
          </b-card-text>
        </b-card>


        <b-card title="日常办公" img-src="https://mlib.liuzijin.com/frontend/images/dailycollaboration.webp" img-alt="Image" img-bottom>
          <b-card-text>
          随时邀请他人一起协作，不需要跑来跑去
          </b-card-text>
        </b-card>

        <b-card title="远程办公" img-src="https://mlib.liuzijin.com/frontend/images/workanywhere.webp" img-alt="Image" img-bottom>
          <b-card-text>
          无论身在何处，实时接入协作
          </b-card-text>
        </b-card>

      </b-card-group>

    <div>
      <b-jumbotron bg-variant="success">
        <template v-slot:header>多种接入方式</template>

        <template v-slot:lead>
        不同的接入方式，适合不同的客户类型。从个人，到几个人的小团队，到大型企业，我们提供与之匹配的部署方式。既可以使用SaaS服务，也可以采用独立部署。即可支持包年包月付费使用，也支持免费的小规模应用。
        </template>
      </b-jumbotron>
    </div>
    <b-card-group deck>
        <b-card title="个人版">
          <b-card-text>
          免费使用，以及不限制次数的两人以内的协作使用，并通过通过分享方式获得免费扩容
          </b-card-text>
        </b-card>
        <b-card title="小团队版">
          <b-card-text>
          提供基于限定白板数量的使用方式，通过分享，可获得免费扩容
          </b-card-text>
        </b-card>
        <b-card title="企业版">
          <b-card-text>
          按年费方式使用，白板数量，协作人数没有任何限制
          </b-card-text>
        </b-card>
        <b-card title="企业私有版">
          <b-card-text>
          为企业客户提供独立部署，既支持互联网方式独立部署，也支持部署在企业内网
          </b-card-text>
        </b-card>
        <b-card title="企业定制版">
          <b-card-text>
          按企业客户要求，进行功能定制开发，与企业内网系统的继承等
          </b-card-text>
        </b-card>
    </b-card-group>
    <div class="my-3"></div>
    <div style="background-image:url('https://source.unsplash.com/collection/10606135'); background-position: 50% 50%; background-repeat: none; background-size: cover; width:100%; height: 100px" class="mb-3"> </div>
            <div class="footnote1 mb-5" >
                <a target="_blank" href='http://weibo.com/cocopad'>深圳市昆伦博德互联网科技有限公司 2020 
                <a href="http://beian.miit.gov.cn" taget="_blank">粤ICP备17154503号</a>
            </div>
</div>
</template>
