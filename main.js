((global) => {
    //DOM
    const title = document.getElementById('title');   
    const questionMessage = document.getElementById('questionMessage');
    const start = document.getElementById('start');
    const bottom = document.getElementById('bottom');
    global.subTitle = document.getElementById('subTitle');

    //グローバル変数を宣言、初期化
    global.count = 0; //現在が何問目の出題かをカウント
    global.correctCount = 0; //正答した回数をカウント

    const quizInstances = [];

    //文章の初期化
    questionMessage.innerHTML = '以下のボタンをクリック';
    title.innerHTML = 'ようこそ';

    //「開始」ボタンを押下したとき
    start.addEventListener('click', () => {

        //クイズを取得した後にページを更新する
        //取得完了前にページを更新してしまうとクイズインスタンスにクイズデータがセットされる前になので、ページが正常に表示されない
        fetch('https://opentdb.com/api.php?amount=10')
            .then((response) => {
                console.log('Response Dataを取得しました：', response);
                return response.json();
            })
            .then((quizDataObj) => {
                console.log('Promise Valueを取得しました：', quizDataObj);

                quizDataObj.results.forEach((element) => {
                    //QuizClassをインスタンス化
                    const quiz = new QuizClass(element);
                    quizInstances.push(quiz);
                })
                //ページを更新
                screenUpdate(quizInstances);
            })
            .catch((error) => {
                console.log('クイズデータの取得に失敗しました：', error);
                alert('エラーが発生しました');
            });

        //クイズデータの取得中、その旨を表示する
        questionMessage.innerHTML = '少々お待ちください';
        title.innerHTML = '取得中';

        //「開始」ボタンを削除
        bottom.removeChild(start);
    });
})(window);