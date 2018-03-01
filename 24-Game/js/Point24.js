var Point24 = {
    nums: null,
    answer: null,

    init: function () {
        this.nums = this.getRandNums();
        this.showNum();
        this.answer = this.getAnswers();
    },

    getRandNums: function () {
        let nums = new Array();
        do {
            for (let i = 0; i < 4; i++) {
                nums[i] = Math.round(Math.random() * 9 + 1);
            }
        } while (!this.judgePoint24(nums));
        return nums;
    },

    /* 用于判断一组nums(长度为4)是否能够通过加减乘除形成24
     * 一个dfs算法，不断搜索所有的可能性
     */
    judgePoint24: function (nums) {
        nums = nums || this.nums;
        // 当迭代到最后只剩一个数时，判断这个数是否等于24
        if (nums.length === 1) {
            // 因为计算机中浮点数不是完全精确的，用Math.abs(nums[0] - 24) < 0.001判断nums[0]是否是24
            return Math.abs(nums[0] - 24) < 0.001;
        }

        for(let i=1; i<nums.length; i++){
            for(let j=0; j<i; j++){
                let iValue = nums[i];
                let jValue = nums[j];

                // 生成nums的副本，并pop掉i, j上的数
                let thisNums = nums.slice();
                thisNums.splice(i, 1);
                thisNums.splice(j, 1);
                let isValid = false;
                isValid = isValid || this.judgePoint24([iValue+jValue, ...thisNums]) || this.judgePoint24([iValue*jValue, ...thisNums]);
                isValid = isValid || this.judgePoint24([iValue-jValue, ...thisNums]) || this.judgePoint24([jValue-iValue, ...thisNums]);
                if (jValue !== 0){
                    isValid = isValid || this.judgePoint24([iValue/jValue, ...thisNums]);
                }
                if (iValue !== 0){
                    isValid = isValid || this.judgePoint24([jValue/iValue, ...thisNums]);
                }
                if (isValid) return true;
            }
        }
        return false;
    },

    showNum: function(){
        var nums = this.nums;
        for (var i = 0; i < nums.length; i++) {
            $('#number_group').append('<div class="number"><p class="num_p">'+ nums[i] +'</p></div>');
        }
    },

    // Used to get all possible answers of the given four numbers
    getAnswers: function (nums) {
        nums = nums || this.nums;

        // Used to define the operator
        function oper(f, m, n){
            if(f === 3) return m*n;
            if(f === 2) return m/n;
            if(f === 1) return m-n;
            if(f === 0) return m+n;
        }

        let res = '';
        var tmp = null;
        let disoper = {0: '+', 1: '-', 2: '/', 3: '*'};

        // Invoke function getPermutation to get the Permutations of the given four numbers;
        let permutations = this.getPermutation(nums);
        let operators = this.getOperators();
        for (let p of permutations){
            for (let f of operators){
                // ((a f0 b) f1 c) f2 d
                tmp = oper(f[2], oper(f[1], oper(f[0], p[0], p[1]), p[2]), p[3]);
                if(Math.abs(tmp - 24) < 1e-5){
                    res += '((' + p[0] + disoper[f[0]] + p[1] + ')' + disoper[f[1]] + p[2] + ')' + disoper[f[2]] + p[3] + '\n';
                }

                // (a f0 b) f1 (c f2 d)
                tmp = oper(f[1], oper(f[0], p[0], p[1]), oper(f[2], p[2], p[3]))
                if(Math.abs(tmp - 24) < 1e-5){
                    res += '(' + p[0] + disoper[f[0]] + p[1] + ')' + disoper[f[1]] + '(' + p[2] + disoper[f[2]] + p[3] + ')' + '\n';
                }

                // (a f0 (b f1 c)) f2 d
                tmp = oper(f[2], oper(f[0], p[0], oper(f[1], p[1], p[2])), p[3])
                if(Math.abs(tmp - 24) < 1e-5){
                    res += '(' + p[0] + disoper[f[0]] + '(' + p[1] + disoper[f[1]] + p[2] + '))' + disoper[f[2]] + p[3] + '\n';
                }

                // a f0 ((b f1 c) f2 d)
                tmp = oper(f[0], p[0], oper(f[2], oper(f[1], p[1], p[2]), p[3]))
                if(Math.abs(tmp - 24) < 1e-5){
                    res += p[0] + disoper[f[0]] + '((' + p[1] + disoper[f[1]] + p[2] + ')' + disoper[f[2]] + p[3] + ')' + '\n';
                }

                // a f0 (b f1 (c f2 d))
                tmp = oper(f[0], p[0], oper(f[1], p[1], oper(f[2], p[2], p[3])))
                if(Math.abs(tmp - 24) < 1e-5){
                    res += p[0] + disoper[f[0]] + '(' + p[1] + disoper[f[1]] + '(' + p[2] + disoper[f[2]] + p[3] + ')' + ')' + '\n';
                }

            }
        }
        return res;
    },

    /* Used to generate all possible permutations of the 4 numbers
     * There is a trick, we use bitwise OR to if there is a repeat in a set
     */
    getPermutation: function (nums) {
        // Array res is used to store all permutations
        let res = new Array();
        // Array data is to put the 4 number on position 1, 10, 100, 1000
        // then we could check if there is a repeat by bitwise OR them
        let data = new Array();
        data[1] = nums[0];
        data[2] = nums[1];
        data[4] = nums[2];
        data[8] = nums[3];

        for(let i1=1; i1<=8; i1*=2){
            for(let i2=1; i2<=8; i2*=2){
                for(let i3=1; i3<=8; i3*=2){
                    for(let i4=1; i4<=8; i4*=2){
                        if ((i1|i2|i3|i4) !== 0xf) continue;
                        let tmp = new Array();
                        tmp[0] = data[i1];
                        tmp[1] = data[i2];
                        tmp[2] = data[i3];
                        tmp[3] = data[i4];
                        res.push(tmp);
                    }
                }
            }
        }
        return res;
    },

    // get the permutation of all possible of add, sub, mul, div
    getOperators: function () {
        let res = new Array();
        for (let f1=0; f1<4; f1++){
            for (let f2=0; f2<4; f2++){
                for (let f3=0; f3<4; f3++){
                    res.push([f1, f2, f3]);
                }
            }
        }
        return res;
    }

};