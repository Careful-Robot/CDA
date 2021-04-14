// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'carefulrobot-9gdwsth4e675d6ac'
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
            [`reservations.${index}.${event.time}`]: _.addToSet(event.user_id),
            [`reservations.${index}.${event.time}_reservations`]: _.inc(1)
          }
        }).then(res1 => {
          db.collection('User').doc(event.user_id).update({
            data: {
              'reservations.hospital_id': event.hospital_id,
              'reservations.doctor_id': event.doctor_id,
              'reservations.timestamp': event.timestamp,
              'reservations.time': event.time,
              isReservations: true
            }
          })
        })
      }
    })
  })
}