// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'carefulrobot-9gdwsth4e675d6ac'
})
const db = cloud.database()
const _ = db.command
var date = new Date()
var weekArr = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
var week = weekArr[date.getDay()]
var temp = `work_time.${week}`

// 云函数入口函数
exports.main = async (event, context) => {
  if (date.getHours() >= 16) {
    var today = (date.getTime() - (date.getHours() + 8 - 24) * 3600000 - date.getMinutes() * 60000 - date.getSeconds() * 1000).toString().slice(0, -3)
  } else {
    var today = (date.getTime() - (date.getHours() + 8) * 3600000 - date.getMinutes() * 60000 - date.getSeconds() * 1000).toString().slice(0, -3)
  }
  await db.collection('Time')
    .where({
      time: today
    })
    .get()
    .then(res => {
      if (res.data.length == 0) {
        // 找不到当天记录：代表数据库过旧或不存在，重建数据库
        db.collection('Time')
          .where({
            time: _.neq('')
          })
          .remove()
          .then(res1 => {
            for (let index = 0; index < 7; index++) {
              let time = (parseInt(today) + index * 86400).toString()
              if (date.getDay() + index < weekArr.length) {
                week = weekArr[date.getDay() + index]
              } else {
                week = weekArr[(date.getDay() + index) - weekArr.length]
              }
              temp = `work_time.${week}`
              db.collection('Doctor')
                .where({
                  [temp]: true
                }).get().then(res2 => {
                  db.collection('Time').add({
                    data: {
                      time,
                      doctor: []
                    }
                  }).then(res3 => {
                    res2.data.forEach(function (item, index) {
                      db.collection('Time').doc(res3._id).update({
                        data: {
                          doctor: _.push([{
                            "doctor_id": item._id,
                            "morning_reservations": 0,
                            "afternoon_reservations": 0
                          }])
                        }
                      })
                    })
                  })
                })
            }
          })
      } else {
        // 找到当天记录：清除过期记录，新建一周内未建记录
        db.collection('Time')
          .where({
            time: _.lt(today)
          }).remove().then(res1 => {
            db.collection('Time')
              .where({
                time: _.neq('')
              }).count().then(res2 => {
                if (res2.total < 7) {
                  for (let index = 0; index < 7; index++) {
                    let time = (parseInt(today) + index * 86400).toString()
                    db.collection('Time')
                      .where({
                        time
                      }).get().then(res3 => {
                        if (res3.data.length == 0) {
                          if (date.getDay() + index < weekArr.length) {
                            week = weekArr[date.getDay() + index]
                          } else {
                            week = weekArr[(date.getDay() + index) - weekArr.length]
                          }
                          temp = `work_time.${week}`
                          db.collection('Doctor')
                            .where({
                              [temp]: true
                            }).get().then(res4 => {
                              db.collection('Time').add({
                                data: {
                                  time,
                                  doctor: []
                                }
                              }).then(res5 => {
                                res4.data.forEach(function (item, index) {
                                  db.collection('Time').doc(res5._id).update({
                                    data: {
                                      doctor: _.push([{
                                        "doctor_id": item._id,
                                        "morning_reservations": 0,
                                        "afternoon_reservations": 0
                                      }])
                                    }
                                  })
                                })
                              })
                            })
                        }
                      })
                  }
                }
              })
          })
      }
    })
}