import * as signalR from '@aspnet/signalr'
const signal = new signalR.HubConnectionBuilder()　　　//服务器地址
    .withUrl('http://192.168.1.101:6001/chathub', { })
    .build()
 
/* const signalr = function () {
  var hub
  if (hub === undefined) {
    hub = signal
  }
  return hub
} */
//  自动重连
/* async function start () {
  try {
    await signal.start()
    console.log('connected')
  } catch (err) {
    console.log(err)
    setTimeout(() => start(), 5000)
  }
}
 
signal.onclose(async () => {
  await start()
}) */
export default {
    //install方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象。
    install: function(Vue) {
        Vue.prototype.signalr = signal
    }
}