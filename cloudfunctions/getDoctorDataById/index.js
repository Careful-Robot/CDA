// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'carefulrobot-9gdwsth4e675d6ac'
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection('Doctor').doc(event.id).get()
}