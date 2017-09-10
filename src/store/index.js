import Vue from 'vue';
//  vuex基于vue ，所有在其后面引入
import VueX from 'vuex';

Vue.use(VueX);   //Vue插件中引入VueX

//  引入配置好的vuex属性模块
import mutations from './mutation';
import state from './state';
import * as actions from './actions';
import * as getters from './getters';

export default new VueX.Store({
	mutations,
	state,
	actions,
	getters
});

/**
 * 使用说明： 
 * 	state对象  ：指的是，绑定在vuex对象中的state对象， 保存着各种共享状态和数据。
 * 	mutations对象 : 定义了很多可以改变state对象中参数的方法。要做此操作时，
 * 	                  可以使用mapMutations()方法，直接使用其中的函数；
 * 	                  也可以通过mapActions()方法, 间接操作其中函数，去改变state；
 * 	action对象 ： 定义了很多操作mutations中方法的函数， 调用时使用mapActions()函数；
 * 	getters对象 ：定义了很多获取state中数据的方法 ， 调用时使用mapGetters()函数；
 *
 *
 * prototpye： 在vuex原型链中的方法；都要配合...拓展运算符使用
 * 
 *  mapMutations() ：  
 * 		使用: 在需要使用的组件上的methods属性上，加上一个...mapMutations();
 * 				在里面传一个对象，如...mapMutations( {
 * 										doSomething: 'DO_SOMETHING',
 * 									} )
 * 					其中键名为 自定义的函数名 ，键值是在mutations中定义好的方法名；
 * 						最后在合适的地方调用自定义的函数,在传参数即可。如： this.doSomething( somedata );
 * 		参数类型：Object{}； 
 * 		
 *
 *  mapActions() ：  
 * 		使用: 在需要使用的组件上的methods属性上，加上一个...mapActions();
 * 				在里面传一个数组，如...mapMutations( [
 * 										'doSomething',
 * 									] )
 * 					数组中的每一个值都是你需要调用的actions对象中的方法名；传参的时候注意要是字符串；
 * 						最后在合适的地方调用自定义的函数,在传参数即可。如： this.doSomething( somedata );
 * 		参数类型：Array[]；
 * 		
 *
 *  mapGetters() ：  
 * 		使用: 在需要使用的组件上的computed属性上，加上一个...mapGetters();
 * 				在里面传一个数组，如...mapGetters( [
 * 										'getSomeData',
 * 									] )
 * 					数组中的每一个值都是你需要调用的getters对象中的方法名；传参的时候注意要是字符串；
 * 						【注意】：这里无效调用，因为在computed会帮我们计算好数组中所有函数的返回值绑定到
 * 							computed上。
 * 		参数类型：Array[]； 
 */


