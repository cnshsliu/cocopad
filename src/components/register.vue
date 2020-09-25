<template>
        <div id="registerform" class="registerform">
            <b-form autocomplete="off" class="w-100 text-center px-2">
                <div v-if="KFK.urlMode==='ivtcode'" class="mt-3">
                    {{model.invitor.name}}<BR>
                    邀请您使用即时协作平台
                </div>
                <div v-show="model.register.step==='reg'">
                    <b-row>
                        <b-col class="pb-4" style="font-size:28px">
                            新用户注册
                        </b-col>
                    </b-row>
                    <b-input-group prepend="注册账号" class="mb-1">
                        <b-form-input id="regUserId" tabindex="1" trim v-model="model.register.userid"
                            :state="state.reg.userid" required placeholder="手机号或邮箱地址"></b-form-input>
                    </b-input-group>
                    请使用手机号码或邮箱地址注册
                    <!-- 虽然可以用邮箱注册，但如果你未来需要团队三人以上的团队协作时，还是需要用到手机号码<BR>
                    所以，请尽量使用手机号码来注册 -->
                    <b-input-group prepend="您的全称" class="mb-1">
                        <b-form-input id="regUserName" tabindex="2" trim v-model="model.register.name"
                                                       autocomplete = "username"
                            :state="state.reg.name" required placeholder="2个以上汉字或4个以上英文"></b-form-input>
                    </b-input-group>
                    <b-input-group prepend="您的密码" class="mb-1">
                        <b-form-input id="regUserPwd" tabindex="3" trim :type="model.hidepassword?'password':'text'"
                                                       autocomplete = "new-password"
                            v-model="model.register.pwd" :state="state.reg.pwd" class="no-right-border" required
                            placeholder="6个以上字母数字特殊字符">
                        </b-form-input>
                        <span class="right-eye">
                            <b-button href="#" tabindex="-1" class="show-password" @click="toggleHidePassword"
                                variant="outline-none">
                                <b-icon scale="1.5" :icon="model.hidepassword?'eye':'eye-slash'" />
                            </b-button>
                        </span>
                    </b-input-group>
                    <b-input-group prepend="再次录入" class="mb-1">
                        <b-form-input id="regUserPwd2" tabindex="4" trim :type="model.hidepassword?'password':'text'"
                                                       autocomplete = "new-password"
                            v-model="model.register.pwd2" :state="state.reg.pwd2" class="no-right-border" required
                            placeholder="两次密码输入需要一致"></b-form-input>
                        <span class="right-eye">
                            <b-button href="#" tabindex="-1" class="show-password" @click="toggleHidePassword"
                                variant="outline-none">
                                <b-icon scale="1.5" :icon="model.hidepassword?'eye':'eye-slash'" />
                            </b-button>
                        </span>
                    </b-input-group>
                    <div class="bg-none">
                    </div>
                    <div class="bg-none mt-3 login-button-area">
                        <b-button @click="ACM.registerUser" tabindex="5" variant="primary">注册 &gt;&gt;</b-button>
                        <a href="/?dou=welcome_new_user">先不注册，直接体验</a>
                        <a href="#" @click="KFK.gotoSignin">我已有账号，请登录</a>
                    </div>
                </div>
                <div v-show="model.register.step==='code'">
                    <b-row>
                        <b-col class="pb-4" style="font-size:28px">
                            新用户注册
                        </b-col>
                    </b-row>
                    <b-form-group>
                        <b-form-input id="regUserCode" tabindex="10" trim v-model="model.register.code"
                            class="mb-2 mr-sm-2 mb-sm-0" required placeholder="请输入六位验证码"></b-form-input>
                    </b-form-group>
                    <b-row>
                        <b-col class="bg-none mt-3">
                            <b-button @click="ACM.verifyRegCode" tabindex="11" variant="primary">验证 &gt;&gt;</b-button>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col class="bg-none">
                            <a href="#" class="card-link" @click="ACM.resendVerifyCode">没有收到验证码？点这里重新发送</a>
                        </b-col>
                    </b-row>
                </div>
            </b-form>
        </div>
</template>
