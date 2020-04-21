

let leftList = [];
let rightList = [];



function fenlie(list,self) {
    console.log(self.rightList)
    list.forEach((item, index) => {
        // console.log(item,index)
        if (index % 2 == 1) { // index是从0开始的
            // console.log(self.rightList)
            // that.rightList.push(item)
        } else {
            // that.leftList.push(item)
        }
    })

}
let list = [1, 2, 3, 4, 5, 6, 7, 8, 9]
fenlie(list,this)
console.log(leftList)
console.log(rightList)