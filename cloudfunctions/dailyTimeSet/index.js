// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'carefulrobot-9gdwsth4e675d6ac'
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
                        afternoon_reservations: 0
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
                            afternoon_reservations: 0
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