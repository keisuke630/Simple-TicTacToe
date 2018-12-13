/**
 * ゲームルール:
 * 
 * ープレイヤーは二人、ラウンド制
 * ーお互いのターン中、フィールドの一か所をクリックして自分の印を描くことができる。
 * ー縦、横、斜めいずれかのフィールドを３か所続けて印をつけたほうの勝ち
 * ーいずれのプレイヤーも連続して3か所印をつけることができずにすべてのフィールドが埋まった場合引き分けとする。
 */
(function () {
    'use strict';
    var activePlayer = 1;
    var gameField = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    var turn = 0;
    var gamePlaying = true;

    document.addEventListener('click', function (e) {
        var target = e.target;
        if (gamePlaying) {
            //クリックされたボタンを特定する。
            if (target.tagName === 'INPUT' && target.type === 'button') {
                var buttonNum = target.id.split('_')[2];
                var check1 = document.querySelector('#game_button_' + buttonNum).classList.contains('clickedBy1');
                var check2 = document.querySelector('#game_button_' + buttonNum).classList.contains('clickedBy2');
                //クリックされたボタンがすでに押されていないか確認　されていないなら以下の処理を行う。
                if (!check1 && !check2) {
                    turn++;
                    //jsのゲームフィールドにどちらがクリックしたか格納する
                    var lineNum = Math.floor(buttonNum / 3);
                    var culumnNum = buttonNum % 3;
                    gameField[lineNum][culumnNum] = activePlayer;
                    //htmlのクラスに誰がクリックしたかを記録
                    document.querySelector('#game_button_' + buttonNum).classList.add('clickedBy' + activePlayer);
                    checkWin();
                    //ターンが9で決着が付かないとき、すなわち引き分けなら終わる
                    if (turn === 9) {
                        endgame();
                    }
                    activePlayer === 1 ? activePlayer = 2 : activePlayer = 1;
                }
            }
            //ゲーム終了時、フィールドの外をクリックすると盤面がリセットされる
        } else if (!gamePlaying && target.type !== 'button') {
            init();
        }
    });
    //勝利条件を満たしているか調べる　満たしていたら画像を変える
    function checkWin() {
        for (let x = 0; x < 3; x++) {
            //縦
            if (gameField[x][0] === gameField[x][1] && gameField[x][1] === gameField[x][2] && gameField[x][0] !== 0) {
                changeButtonColor(3*x);
                changeButtonColor(3*x + 1);
                changeButtonColor(3*x + 2);
                endgame();
                console.log(gameField);
                break;
            }
            //横
            else if (gameField[0][x] === gameField[1][x] && gameField[1][x] === gameField[2][x] && gameField[0][x] !== 0) {
                changeButtonColor(x);
                changeButtonColor(x + 3);
                changeButtonColor(x + 6);
                endgame();
                console.log(gameField);
                break;
                //斜めその１
            } else if (gameField[0][0] === gameField[1][1] && gameField[1][1] === gameField[2][2] && gameField[0][0] !== 0) {
                changeButtonColor(0);
                changeButtonColor(4);
                changeButtonColor(8);
                endgame();
                console.log(gameField);
                break;
                //斜めその2
            } else if (gameField[0][2] === gameField[1][1] && gameField[1][1] === gameField[2][0] && gameField[0][2] !== 0) {
                changeButtonColor(2);
                changeButtonColor(4);
                changeButtonColor(6);
                endgame();
                console.log(gameField);
                break;
            }
        }
    }

    function changeButtonColor(n) {
        document.querySelector('#game_button_' + n).classList.remove('clickedBy1');
        document.querySelector('#game_button_' + n).classList.remove('clickedBy2');
        document.querySelector('#game_button_' + n).classList.add('player_' + activePlayer + '_win');
    }

    function endgame() {
        gamePlaying = false;
    }

    function init() {
        //gameFieldの初期化
        for (let i = 0; i < 3; i++) {
            for (let l = 0; l < 3; l++) {
                gameField[i][l] = 0
            }
        }
        //HTMLに加えたリストの削除
        for (let m = 0; m < 9; m++) {
            document.querySelector('#game_button_' + m).classList.remove('clickedBy1');
            document.querySelector('#game_button_' + m).classList.remove('clickedBy2');
            document.querySelector('#game_button_' + m).classList.remove('player_1_win');
            document.querySelector('#game_button_' + m).classList.remove('player_2_win');
        }
        activePlayer = 1;
        gamePlaying = true;
        turn=0;

    }
})();