var pool=require("./connection")//请求数据库
function digitToString(num){
    if(num<10){
        return '0' + num.toString();
    }else{
        return num.toString();
    }
}
function getTime(){
    var myDate = new Date();
    var year=digitToString(myDate.getFullYear());
    var month = digitToString(myDate.getMonth()+1);
    var day = digitToString(myDate.getDate());
    var hour = digitToString(myDate.getHours());
    var minute = digitToString(myDate.getMinutes());
    var second = digitToString(myDate.getSeconds());
    return year+month+day+hour+minute+second;
}

function loginSQL(user_ID){            //登入
    return "select * from User where user_ID="+user_ID+";";
}
function roomSQL(user_ID){
    return"select room_Name ,Room.room_ID, curtain_ID,curtain_State from Room inner join Curtain where Curtain.room_ID=Room.room_ID and user_ID="+user_ID+";";
}
function curstateSQL(curtain_ID){
    return"select curtain_State from Curtain where curtain_ID="+curtain_ID+";";
}
function docurtainSQL(record_ID,curtain_ID,Record_State,time){
    return"insert into Record values("+record_ID+","+ curtain_ID+","+Record_State+","+time+");";
}
function updatestateSQL(curtain_ID,curtain_State){
    return"update Curtain set curtain_State="+curtain_State+" where curtain_ID="+curtain_ID+";";
}
function stopSQL1(curtain_ID,time){
    return"insert into Record values(Record_ID,"+curtain_ID+","+time+",0);" ;
}
function stopSQL2(curtain_ID) {
    return "update Curtain set curtain_State=0 where curtain_ID=" + curtain_ID + ";";
}
function judge(k)
    {
        if(k>0)
            return true;
        else return false;
    }


class SQLApi{
    loginSQL(user_ID,callback){
        pool.query(loginSQL(user_ID),function (err,rows){
            callback(err,rows);
        })
    }
    roomSQL(user_ID,callback){
        pool.query(roomSQL(user_ID),function (err,rows){
            console.log(rows)
            console.log(err)

            var nameTemp=new Array();        //记录一个用户拥有的房间的名称
           // var curtainNum=new Array(2);
            for(let i=0;i<rows.length;i++)
            {
                let jishu=new Boolean();                     //记录房间名是否有重复的 True为有重复的，not true为没有重复的
                                            // 两个一维数组组合使用，形成一个二维数组的效果，第一列记录房间名，第二列记录房间里面cur个数
                                            //第三列表示房间窗帘状态
                for(let j=0;j<nameTemp.length;j++)
                {
                    if(nameTemp[j][0]===rows[i].room_Name) {
                        nameTemp[j][1]++;
                        if(rows[i].curtain_State===1||rows[i].curtain_State===2)          // 0 表示完全关上
                            nameTemp[j][2]=1;
                        else if(rows[i].curtain_State===0)
                            nameTemp[j][2]=0;
                        jishu=true;
                    }
                }
                if(jishu!=true) {
                    nameTemp[nameTemp.length]=new Array(3);
                    nameTemp[nameTemp.length-1][0]=rows[i].room_Name;
                    nameTemp[nameTemp.length-1][1]=1;
                    if(rows[i].curtain_State===1||rows[i].curtain_State===2)          // 0 表示完全关上
                        nameTemp[nameTemp.length-1][2]=1;
                    else if(rows[i].curtain_State===0)
                        nameTemp[nameTemp.length-1][2]=0;
                }

            }
            console.log(rows[0].curtain_ID)
            var data=[];            //建立窗帘数据存放表
            var count=0;
            for(let i=0;i<nameTemp.length;i++) {             //第一层循环：房间数
                var curtains=[];
                for(let j=0;j<nameTemp[i][1];j++) {             //第二层循环
                   curtains.push({name:rows[count].curtain_ID,state:nameTemp[i][2]});
                   count++;
                }
                data.push({room:nameTemp[i][0],state:nameTemp[i][2],curtain:curtains})
            }
            console.log(data)
                /* let i=rows.length;    // i 表示有多少条窗帘
                 console.log(i);
                 // var h=rows.splice();
                 var bedRoom=0;
                 var bashRoom=0;
                 var bedState=0;
                 var bashState=0;
                 var belongbedroom= new Array();
                 var numberBedroom=0;
                 var numberBushroom=0;
                 var belongbushroom= new Array();
                 for(let k=0;k<i;k++)   //计算bedroom和bashroom中各有多少个窗帘
                 {
                     switch(rows[k].room_Name)
                     {
                         case "bedroom":{
                             bedRoom++;
                             belongbedroom[numberBedroom]=k;
                             numberBedroom++;
                             if(rows[k].curtain_State==1)
                                 bedState=1;
                         }
                             break;
                         case"bashroom":{
                             bashRoom++;
                             belongbushroom[numberBushroom]=k;
                             numberBushroom++;
                             if(rows[k].curtain_State==1)
                                 bashState=1;
                         }
                             break;
                     }
                 }
                 var rooms=0;  //记录房间种类数
                 if(bedRoom!=0)
                     rooms++;
                 if(bashRoom!=0)
                     rooms++;
                 var sbed=0;
                 var sbush=0;
                 var data= new Array();
                 if(bedRoom!=0)
                     data[0]={
                         room:"bedroom",
                         state:bedState,
                         curtain:
                         [
                             {name : rows[belongbedroom[sbed++]].room_Name, state:judge(rows[belongbedroom[sbed++]].curtain_State)}
                          ]
                     }
                     data[1]={
                         room:"bashroom",
                         state:bashState,
                         curtain:
                             [
                                 {name : rows[belongbashroom[sbed++]].room_Name, state:judge(rows[belongbashroom[sbash++]].curtain_State)}
                             ]
                     }*/


                /*
                            var data=[
                                {
                                    room:"我的房间",
                                    state:true,
                                    curtain:
                                        [
                                            {name:"左窗帘",state:true},
                                            {name:"右窗帘",state:false}
                                        ]
                                },
                                {
                                    room:"客厅",
                                    state:false,
                                    curtain:
                                        [
                                            {name:"窗帘1",state:false},
                                            {name:"窗帘2",state:false},
                                            {name:"窗帘3",state:false}
                                        ]
                                },
                                {
                                    room:"书房",
                                    state:true,
                                    curtain:
                                        [
                                            {name:"窗帘3",state:true},
                                            {name:"窗帘4",state:false},
                                        ]
                                }
                */
            callback(err,data);
        })
    }
    curstateSQL(curtain_ID,callback){
        pool.query(curstateSQL(curtain_ID),function (err,rows){
            callback(err,rows);
        })
    }
    docurtainSQL(record_ID,curtain_ID,Record_State,callback){
        var time=getTime();
        pool.query(docurtainSQL(record_ID,curtain_ID,Record_State,time),function(err,rows) {
            callback(err, rows);
        })
    }
    updatestateSQL(curtain_ID,curtain_State,callback){
        pool.query(updatestateSQL(curtain_ID,curtain_State),function(err,rows){
            callback(err,rows);
        })
    }
    stopSQL1(curtain_ID,callback){
        var time=getTime();
        pool.query(stopSQL1(curtain_ID,time),function(err,rows){
        callback(err,rows);
        })
    }
    stopSQL2(curtain_ID,callback){
        pool.query(stopSQL2(curtain_ID),function(err,rows){
            callback(err,rows);
        })
    }
}





module.exports = SQLApi;