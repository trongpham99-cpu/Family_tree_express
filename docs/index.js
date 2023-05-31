const giaphahoTran = {
    root: {
        name: "Ông tổ",
        children: [
            'dev_1',
            'dev_2',
            'dev_3',
            // to be continue
        ],
        parentId: null
    },
    dev_1: {
        name: "dev_1",
        children: [
            'dev_1_1',
            'dev_1_2',
            // to be continue
        ],
        parentId: 'root'
    },
    dev_2: {
        name: "dev_2",
        children: [
            'dev_2_1',
            'dev_2_2',
            // to be continue
        ],
        parentId: 'root'
    },
    dev_3: {
        name: "dev_3",
        children: [
            'dev_3_1',
            'dev_3_2',
            // to be continue
        ],
        parentId: 'root'
    },
    dev_1_1: {
        name: "dev_1_1",
        children: [
            "dev_1_1_1",
            // to be continue
        ],
        parentId: 'dev_1'
    },
    dev_1_2: {
        name: "dev_1_2",
        children: [
            // to be continue
        ],
        parentId: 'dev_1'
    },
    dev_1_1_1: {
        name: "dev_1_1_1",
        children: [
            // to be continue
        ],
        parentId: 'dev_1_1'
    },
    // to be continue
}

//update data
giaphahoTran['dev_1'] = {
    ...giaphahoTran['dev_1'],
    name: "dev_1_update",
}

//get data dev_1
const result = [];
// giaphahoTran['root'].children.map((id) => {
//     console.log(giaphahoTran[id]);
//     result.push(giaphahoTran[id]);
// })

function recursive(id, array = []) {
    if (giaphahoTran[id]?.children?.length > 0) {
        giaphahoTran[id].children.map((id) => {
            array.push(giaphahoTran[id]);
            recursive(id, array);
        })
    }
    return array;
}

console.log(recursive('dev_1'));