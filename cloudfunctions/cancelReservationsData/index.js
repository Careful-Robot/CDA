// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'carefulrobot-6gq11fqqd8e16755'
})
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  await db.collection('Doctor').doc(event.doctor_id).get().then(res => {
    res.data.reservations.forEach(function (item, index) {
      if (item.time == event.timestamp) {
        db.collection('Doctor').doc(event.doctor_id).update({
          data: {
            [`reservations.${index}.${event.time}`]: _.pull(event.user_id),
            [`reservations.${index}.${event.time}_reservations`]: _.inc(-1)
          }
        }).then(res1 => {
          db.collection('User').doc(event.user_id).update({
            data: {
              'reservations.hospital_id': '',
              'reservations.doctor_id': '',
              'reservations.timestamp': '',
              'reservations.time': '',
              isReservations: false
            }
          })
        })
      }
    })
  })
}