// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'carefulrobot-6gq11fqqd8e16755'
})
const db = cloud.database()
const _ = db.command
var date = new Date()

// 云函数入口函数
exports.main = async (event, context) => {
  if (date.getHours() >= 16) {
    var today = (date.getTime() - (date.getHours() + 8 - 24) * 3600000 - date.getMinutes() * 60000 - date.getSeconds() * 1000).toString().slice(0, -3)
  } else {
    var today = (date.getTime() - (date.getHours() + 8) * 3600000 - date.getMinutes() * 60000 - date.getSeconds() * 1000).toString().slice(0, -3)
  }
  // 删除过期预约数据
  await db.collection('User').get().then(res => {
    res.data.forEach(function (item, index) {
      if (parseInt(item.reservations.timestamp) < parseInt(today)) {
        db.collection('User').doc(item._id).update({
          data: {
            'reservations.hospital_id': '',
            'reservations.doctor_id': '',
            'reservations.timestamp': '',
            'reservations.time': '',
            isReservations: false
          }
        })
      }
    })
  })
  await db.collection('Doctor')
    .where({
      'reservations.time': today
    })
    .get()
    .then(res => {
      db.collection('Doctor').count().then(res1 => {
        if (res.data.length != res1.total) {
          // 找不到当天记录：代表数据库过旧或不存在，重建数据库
          db.collection('Doctor')
            .where({
              _id: _.neq('')
            })
            .update({
              data: {
                reservations: []
              }
            }).then(res2 => {
              for (let index = 0; index < 7; index++) {
                let time = (parseInt(today) + index * 86400).toString()
                db.collection('Doctor')
                  .where({
                    _id: _.neq('')
                  })
                  .update({
                    data: {
                      reservations: _.addToSet({
                        time,
                        morning_reservations: 0,
                        afternoon_reservations: 0,
                        morning: [],
                        afternoon: []
                      })
                    }
                  })
              }
            })
        } else {
          // 找到当天记录：清除过期记录，新建一周内未建记录
          db.collection('Doctor')
            .where({
              _id: _.neq('')
            })
            .update({
              data: {
                reservations: _.pull({
                  time: _.lt(today)
                })
              }
            }).then(res2 => {
              db.collection('Doctor').get().then(res3 => {
                if (res3.data[0].reservations.length < 7) {
                  for (let index = res3.data[0].reservations.length; index < 7; index++) {
                    let time = (parseInt(today) + index * 86400).toString()
                    db.collection('Doctor')
                      .where({
                        _id: _.neq('')
                      })
                      .update({
                        data: {
                          reservations: _.addToSet({
                            time,
                            morning_reservations: 0,
                            afternoon_reservations: 0,
                            morning: [],
                            afternoon: []
                          })
                        }
                      })
                  }
                }
              })
            })
        }
      })
    })
}