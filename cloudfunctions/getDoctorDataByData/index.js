// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'carefulrobot-6gq11fqqd8e16755'
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection('Doctor').aggregate()
    .lookup({
      from: 'Hospital',
      localField: 'hospital_id',
      foreignField: '_id',
      as: 'hospital',
    })
    .match({
      hospital_id: event.info.id,
      department: event.info.department
    }).end()
}