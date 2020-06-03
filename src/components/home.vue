<template>
<div>
<div id = "highlight">
</div>
<div>
 <b-card-group deck>
    <b-card title="Title" img-src="https://picsum.photos/300/300/?image=41" img-alt="Image" img-top>
      <b-card-text>
        This is a wider card with supporting text below as a natural lead-in to additional content.
        This content is a little bit longer.
      </b-card-text>
      <template v-slot:footer>
        <small class="text-muted">Last updated 3 mins ago</small>
      </template>
    </b-card>

    <b-card title="Title" img-src="https://picsum.photos/300/300/?image=41" img-alt="Image" img-top>
      <b-card-text>
        This card has supporting text below as a natural lead-in to additional content.
      </b-card-text>
      <template v-slot:footer>
        <small class="text-muted">Last updated 3 mins ago</small>
      </template>
    </b-card>

    <b-card title="Title" img-src="https://picsum.photos/300/300/?image=41" img-alt="Image" img-top>
      <b-card-text>
        This is a wider card with supporting text below as a natural lead-in to additional content.
        This card has even longer content than the first to show that equal height action.
      </b-card-text>
      <template v-slot:footer>
        <small class="text-muted">Last updated 3 mins ago</small>
      </template>
    </b-card>
  </b-card-group>
</div>
<b-container id = "scenarios" class="mt-3 w-100">
<b-row class="w-100">
<b-col>
工作
</b-col>
<b-col>
小团队
</b-col>
<b-col>
教学
</b-col>
<b-col>
学习知识整理
</b-col>
</b-row>
</b-container>
<b-container id="features">
<b-row>
<b-col>
即时协作
</b-col>
<b-col>
云存储
</b-col>
<b-col>
云存储
</b-col>
</b-row>
</b-container>
<b-container id = "plans">
<b-row>
<b-col>
个人版
</b-col>
<b-col>
团队版
</b-col>
<b-col>
企业版
</b-col>
<b-col>
本地版
</b-col>
<b-col>
特别定制版
</b-col>
</b-row>
</b-container>
</div>
</template>
