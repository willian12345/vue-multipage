$(function(){
    // window.txt = $('title').html();
    // window.shareConent = $('#shareDesc').html();
    var getQueryString = function (url){
        if(url) {
            url=url.substr(url.indexOf("?")+1);
        }
        var result = {}, queryString =url || location.search.substring(1),
           re = /([^&=]+)=([^&]*)/g, m;
      
        while (m = re.exec(queryString)) {
         result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
       }
      
       return result;
    };
    // console.log(txt, shareConent);
    window.shareData = {
        title: txt
        ,desc: shareConent
        ,link: location.href.split('#')[0]
        ,timeLineLink: location.href.split('#')[0]
        ,sendFriendLink: location.href.split('#')[0]
        ,tContent: shareConent
        ,tTitle: txt
        ,fContent: shareConent
        ,fTitle: txt
        ,imgUrl: document.getElementById('shareLogo').src
        ,success: function(){
            window.location.href = 'https://x.163.com/marketinglive/vote/petscare/h5.html';
            if(window._hmt){
                _hmt.push(['_trackEvent', 'shareTimelinePet', 'click','myshare']);
            }
        }
    };
    window.onload = function() {
        document.addEventListener("YixinJSBridgeReady", onYixinReady, false); 
    }; 

    function onYixinReady() {
        //分享到朋友圈
        YixinJSBridge.on('menu:share:timeline', function (argv) {
            YixinJSBridge.invoke('shareTimeline', {
                "img_url": window.shareData.imgUrl,
                "img_width": "640",
                "img_height": "640",
                "link": window.shareData.timeLineLink,
                "desc": window.shareData.tContent,
                "title": window.shareData.tTitle
            }, function (res) {
                window.location.href = 'https://x.163.com/marketinglive/vote/petscare/h5.html';
                // 不用处理，客户端会有分享结果提示
                if(window._hmt){
                    _hmt.push(['_trackEvent', 'shareTimelinePet', 'click','myshare']);
                }
            });
        });

        //分享给好友
        YixinJSBridge.on('menu:share:appmessage', function (argv) {
            YixinJSBridge.invoke('sendAppMessage', { 
                "img_url": window.shareData.imgUrl,
                "img_width": "640",
                "img_height": "640",
                "link": window.shareData.sendFriendLink,
                "desc": window.shareData.fContent,
                "title": window.shareData.fTitle
            }, function (res) {
                // 不用处理，客户端会有分享结果提示
                window.location.href = 'https://x.163.com/marketinglive/vote/petscare/h5.html';
                if(window._hmt){
                    _hmt.push(['_trackEvent', 'shareTimelinePet', 'click','myshare']);
                }
            }); 
        });
    }
    var loader = function () {
    	var def = $.Deferred();
        var $appLoader = $('#appLoader'), $progressBar = $('#progressBar'), $progressTxt = $('#progressTxt');
        var manifest = [
            {src: "img/1.jpg?t=1461326509", id: "sprite1"}
            ,{src: "img/2.jpg?t=1461326509", id: "sprite2"}
            ,{src: "img/3.jpg?t=1461326509", id: "sprite3"}
            ,{src: "img/4.jpg?t=1461326509", id: "sprite4"}
            ,{src: "img/5.jpg?t=1461326509", id: "sprite5"}
            ,{src: "img/6.jpg?t=1461326509", id: "sprite6"}
            ,{src: "img/c-sb3474f4d27.png?t=1461326509", id: "se"}
            ,{src: "img/a-s622211144d.png?t=1461326509", id: "da"}
            ,{src: "img/d-sac94603c8f.png?t=1461326509", id: "mojin"}
            ,{src: "img/b-sade0ab75c2.png?t=1461326509", id: "lvjin"}
        ];
        loader = new createjs.LoadQueue(false);
        // loader.on("complete", handleComplete);
        loader.on('progress', function(e){
            console.log('加载进度：' + e.progress);
            var per = (e.progress*100 >>0) + '%';
            $progressBar.css('width', per);
            $progressTxt.html(per);
            if(e.progress >= 1){
                $progressBar.css('width', '100%');
                $progressTxt.html('100%');
                def.resolve();
                $appLoader.hide();
            }
        });
        loader.loadManifest(manifest);

        return def;
    };

    var $wrap = $('#wrap');
    var audEffectStart;
    var audPlot;
    var audTalk;
    var audGotoend;
    var audGameover;
    var initApp = function () {
        initCanvas();  
        audEffectStart =  $('#audEffectStart')[0];
        audPlot =  $('#audPlot')[0];
        audTalk =  $('#audTalk')[0];
        audGotoend =  $('#audGotoend')[0];
        audGameover =  $('#audGameover')[0];
        audEffectStart.play();
        $('.share-now-btn').click(function(){
            $('#sharePage').show();
        });
    };

    // 逐字说话
    function speak($c, t, s, delay){
        var arr = t.split('');
        var l = arr.length - 1;
        var i = 0;
        var def = $.Deferred();
        
        if(s==true){
            audTalk.pause();
        }else{
            audTalk.play();
        }
        if(!s){
            s = 100;
        }else if(s== true){
            s = 100;
        }
        if(!delay){
            delay = 600;
        }
        var timer = setInterval(function(){
            if(i>=l){
                clearInterval(timer);
                if(delay){
                    setTimeout(function(){
                        audTalk.pause();
                        def.resolve();
                    }, delay)
                }else{
                    audTalk.pause();
                    def.resolve();
                }
                
            }
            $c.html($c.html()+arr[i]);
            i++;
        }, s);
        return def;
    }

    function initCanvas(){
        var StageWidth = $wrap.width();
        var StageHeight = $wrap.height();
        $('#canvasScene').width(StageWidth).height(StageHeight);
        var stage = new createjs.Stage("canvasScene");
        createjs.Touch.enable(stage);
        var frameRate = 4;
        var sprite1, sprite2, sprite3, sprite4, sprite5;
        var spriteArr = [];
        
        var spriteSheet1 = new createjs.SpriteSheet({
            framerate: frameRate
            ,images: [loader.getResult('sprite1')]
            ,frames: {regX: 0, regY: 0, count: 10, width: 320, height: 504}
            ,animations: {
                run: [0, 9, false]
            }
        });
        var spriteSheet2 = new createjs.SpriteSheet({
            framerate: frameRate
            ,images: [loader.getResult('sprite2')]
            ,frames: {regX: 0, regY: 0, count: 17, width: 320, height: 504}
            ,animations: {
                run: [0, 16, false]
            }
        });
        var spriteSheet3 = new createjs.SpriteSheet({
            framerate: frameRate
            ,images: [loader.getResult('sprite3')]
            ,frames: {regX: 0, regY: 0, count: 30, width: 320, height: 504}
            ,animations: {
                run: [0, 20, false]
                ,run1: [21, 23, false]
                ,run2: [24, 29, false]
            }
        });
        var spriteSheet4 = new createjs.SpriteSheet({
            framerate: frameRate
            ,images: [loader.getResult('sprite4')]
            ,frames: {regX: 0, regY: 0, count: 12, width: 320, height: 504}
            ,animations: {
                run: [0, 11, false]
            }
        });

        var spriteSheet5 = new createjs.SpriteSheet({
            framerate: frameRate
            ,images: [loader.getResult('sprite5')]
            ,frames: {regX: 0, regY: 0, count: 14, width: 320, height: 504}
            ,animations: {
                run: [0, 9, false]
                ,run1: [9, 13, false]
            }
        });
        var spriteSheet6 = new createjs.SpriteSheet({
            framerate: frameRate
            ,images: [loader.getResult('sprite6')]
            ,frames: {regX: 0, regY: 0, count: 20, width: 320, height: 504}
            ,animations: {
                run: [0, 19, false]
            }
        });
        var lvjinSpriteSheet = new createjs.SpriteSheet({
            framerate: 2
            ,images: [loader.getResult('lvjin')]
            ,frames: {regX: 0, regY: 0, count: 2, width: 320, height: 504}
            ,animations: {
                run: [0, 1]
            }
        });

        var seSpriteSheet = new createjs.SpriteSheet({
            framerate: 2
            ,images: [loader.getResult('se')]
            ,frames: {regX: 0, regY: 0, count: 4, width: 320, height: 504}
            ,animations: {
                run: [0, 3]
            }
        });
        var daSpriteSheet = new createjs.SpriteSheet({
            framerate: 2
            ,images: [loader.getResult('da')]
            ,frames: {regX: 0, regY: 0, count: 2, width: 320, height: 504}
            ,animations: {
                run: [0, 1]
            }
        });
        var mojinSpriteSheet = new createjs.SpriteSheet({
            framerate: 2
            ,images: [loader.getResult('mojin')]
            ,frames: {regX: 0, regY: 0, count: 4, width: 320, height: 504}
            ,animations: {
                run: [0, 3]
            }
        });

        //小动画表情
        var seSprite = new createjs.Sprite(seSpriteSheet);
        var daSprite = new createjs.Sprite(daSpriteSheet);
        var mojinSprite = new createjs.Sprite(mojinSpriteSheet);
        var lvjinSprite = new createjs.Sprite(lvjinSpriteSheet);

        // 视频帧动画
        var spriteSheetArr = [spriteSheet1, spriteSheet2, spriteSheet3, spriteSheet4, spriteSheet5, spriteSheet6];
        var scaleHoz = StageWidth / 320 + 1;
        var scaleVerical = StageHeight / 504 + 1;
        for(var i=0; i<=5; i++){
            var sprite = new createjs.Sprite(spriteSheetArr[i]);
            sprite.x = 0;
            sprite.y = 0;
            if(StageHeight > 504){
                sprite.scaleX = sprite.scaleY = scaleVerical;
                var x = (sprite.getTransformedBounds().width / 2 - StageWidth) / -2;
                if(x<=0){
                    sprite.x += x;    
                }
            }else{
                sprite.scaleX = sprite.scaleY = scaleHoz;

            }
            spriteArr.push(sprite);
        }
        if(StageHeight > 504){
            seSprite.scaleX = seSprite.scaleY = scaleVerical;
            var seX = (seSprite.getTransformedBounds().width / 2 - StageWidth) / -2
            daSprite.scaleX = daSprite.scaleY = scaleVerical;
            mojinSprite.scaleX = mojinSprite.scaleY = scaleVerical;
            lvjinSprite.scaleX = lvjinSprite.scaleY = scaleVerical;
            if(seX <=0){
                seSprite.x += seX;
                mojinSprite.x += seX;
                lvjinSprite.x += seX;
                mojinSprite.x += seX;
            }
        }else{
            seSprite.scaleX = seSprite.scaleY = scaleHoz;
            daSprite.scaleX = daSprite.scaleY = scaleHoz;
            mojinSprite.scaleX = mojinSprite.scaleY = scaleHoz;
            lvjinSprite.scaleX = lvjinSprite.scaleY = scaleHoz;
        }
        
        


        lvjinSprite.gotoAndPlay('run');

        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        createjs.Ticker.on("tick", tick);


        var container = new createjs.Container();
        container.addChild(spriteArr[0]);
        stage.addChild(container, lvjinSprite);
        function tick(event){
            stage.update(event);
        };
        
        var audEffectGet = $('#audEffectGet')[0];

        // 一健通关
        var throwAll = false;
        function gotoPlayAll(){
            if(throwAll == false){
                spriteSheet1.framerate = 24;
                spriteSheet2.framerate = 24;
                spriteSheet3.framerate = 24;
                spriteSheet4.framerate = 24;
                spriteSheet5.framerate = 24;
                spriteSheet6.framerate = 24;
                audPlot.pause();
                audGotoend.play();
            }
            throwAll = true;
        }

        // 情节1
        function playSprite1(){
            var $scene = $('#scene0').show();
            var $dialogL = $scene.find('.l');
            var $dialogR = $scene.find('.r');
            var def = $.Deferred();
            
            spriteArr[0].gotoAndPlay('run');
            
            spriteArr[0].on('animationend', function(){
                $dialogL.show();
                speak($dialogL.find('.vertical'), '诶，那条狗好像有点特别哎。')
                .then(function(){
                    $dialogL.hide();
                    $dialogR.show();
                    return speak($dialogR.find('.vertical'), '你是谁？为啥我能听懂人说话了！');
                })
                .then(function(){
                    $dialogL.show();
                    $dialogR.hide();
                    return speak($dialogL.find('.vertical').html(''), '开发者想让你听懂就听懂咯');
                })
                .then(function(){
                    return speak($dialogL.find('.vertical').html(''), '想填饱肚子必须找到三条线索')
                })
                .then(function(){
                    return speak($dialogL.find('.vertical').html(''), '去吧，流浪汪!')
                })
                .then(function(){
                    $dialogL.hide();
                    audTalk.pause();
                    $('#scene0DialogOption').show();
                });
                
            }); 
            $('#scene0Yes').click(function(){
                $('#scene0').hide();
                playSprite2();
            });

            // 外挂通关
            $('#scene0No').click(function(){
                gotoPlayAll();
                $scene.find('.dialog-options').hide();
                playSprite2(); 
            });
        }
        // 遇到家小汪
        function playSprite2(){
            var $scene = $('#scene1').show();
            var $dialogOptions = $scene.find('.dialog-options');
            var $dialogL = $scene.find('.l');
            var $dialogR = $scene.find('.r');
            container.addChild(spriteArr[1]);
            container.removeChild(spriteArr[0]);
            spriteArr[1].gotoAndPlay('run');
            spriteArr[1].on('animationend', function(){
                if(!throwAll){
                    container.addChild(seSprite);
                    seSprite.gotoAndPlay('run');
                    $dialogL.show();
                    $dialogR.hide();
                    speak($dialogL.find('.vertical').html(''), '昨天的晚饭好好吃……')
                    .then(function(){
                        $dialogL.hide();
                        $dialogR.show();
                        return speak($dialogR.find('.vertical').html(''), '看你流口水的样子，一定知道口粮线索')
                    })
                    .then(function(){
                        $dialogL.show();
                        $dialogR.hide();
                        return speak($dialogL.find('.vertical').html(''), '找个好主人， 口粮网上买')
                    })
                    .then(function(){
                        $dialogL.hide();
                        $dialogR.show();
                        return speak($dialogR.find('.vertical').html(''), '！！！')
                    })
                    .then(function(){
                        $dialogR.hide();
                        audTalk.pause();
                        $dialogOptions.show();
                    });
                }else{// 外挂1
                    $yesResult.show();
                    audEffectGet.play();
                    setTimeout(function(){
                        playSprite3();
                        $yesResult.hide();
                    }, 2400);
                }
            });
            
            var $yesResult = $scene.find('.yes-result');
            var $failResult = $scene.find('.fail-result')
            $dialogOptions.find('.yes').click(function(){
                audEffectGet.play();
                $yesResult.show();
                $dialogOptions.hide();
                setTimeout(function(){
                    $yesResult.hide();
                    playSprite3();
                }, 2000);
            });
            $dialogOptions.find('.no').click(function(){
                $failResult.show();
                audGameover.play();
                $dialogOptions.hide();
            });
            // 外挂to 3
            $scene.find('.exit-btn').click(function(){
                audEffectGet.play();
                gotoPlayAll();
                $failResult.hide();
                $yesResult.show();
                setTimeout(function(){
                    playSprite3();
                    $yesResult.hide();
                }, 2400);
            });
            $scene.find('.reselect').click(function(){
                $failResult.hide();
                $dialogOptions.show();
            });
        }

        // 情节三，遇到狗贩子
        function playSprite3(){
            var $scene = $('#scene2').show();
            var $dialogOptions = $scene.find('.dialog-options');
            var $dialogL = $scene.find('.l');
            var $dialogR = $scene.find('.r');
            var frame = 0;
            container.addChild(spriteArr[2]);
            container.removeChild(spriteArr[1]);
            spriteArr[2].gotoAndPlay('run');
            spriteArr[2].on('animationend', function(){
                if(frame == 0){
                    if(!throwAll){
                        $dialogL.show();
                        $dialogR.hide();
                        speak($dialogL.find('.vertical').html(''), '咦，发现一只狗。')
                        .then(function(){
                            return speak($dialogL.find('.vertical').html(''), '卖给烧烤店一定有个好价钱')
                        })
                        .then(function(){
                            $dialogL.hide();
                            $dialogR.show();
                            return speak($dialogR.find('.vertical').html(''), '！！！')
                        })
                        .then(function(){
                            return speak($dialogR.find('.vertical').html(''), '喵了个咪，我其实是一只猫')
                        })
                        .then(function(){
                            $dialogL.show();
                            $dialogR.hide();
                            return speak($dialogL.find('.vertical').html(''), '┌( ಠ_ಠ)┘')
                        })
                        .then(function(){
                            frame = 1;
                            spriteArr[2].gotoAndPlay('run1');
                        });
                    }else{
                        frame = 1;
                        spriteArr[2].gotoAndPlay('run1');
                    }
                }else if(frame == 1){
                    
                    if(!throwAll){
                        $dialogL.show();
                        $dialogR.hide();
                        container.addChild(daSprite);
                        daSprite.gotoAndPlay('run');

                        speak($dialogL.find('.vertical').html(''), '老王，快来抓狗！')
                        .then(function(){
                            setTimeout(function(){
                                $dialogL.hide();
                                audTalk.pause();
                                $dialogOptions.show();
                            }, 1000);
                        })
                    }else{
                        frame = 2;
                        spriteArr[2].gotoAndPlay('run2');
                    }
                }else if(frame == 2){
                    // 镜头档住并黑屏
                    setTimeout(function(){
                        $scene.addClass('mask');
                        $dialogR.show();
                        if(!throwAll){
                            speak($dialogR.find('.vertical').html(''), '这不是正确选项么？怪蜀黍你要干什么？！')
                            .then(function(){
                                $dialogR.hide();
                                $dialogL.show().find('img').attr('src', 'img/dialog_05.png');
                                return speak($dialogL.find('.vertical').html(''), '……');
                            })
                            .then(function(){
                                return speak($dialogL.find('.vertical').html(''), '开发者派我告诉你：');
                            })
                            .then(function(){
                                return speak($dialogL.find('.vertical').html(''), '卖更多的萌，过更好的生活哦');
                            })
                            .then(function(){
                                $dialogL.hide();
                                $dialogR.hide();
                                audEffectGet.play();
                                $scene.find('.yes-result').show();
                                setTimeout(function(){
                                    container.addChild(spriteArr[3]);
                                    $scene.addClass('fadeOut');
                                    setTimeout(function(){
                                        $scene.hide();
                                        playSprite4(); 
                                    }, 1000);
                                }, 2000);
                            })   
                        }else{
                            $dialogR.hide();
                            audEffectGet.play();
                            $scene.find('.yes-result').show();
                            setTimeout(function(){
                                container.addChild(spriteArr[3]);
                                $scene.addClass('fadeOut');
                                setTimeout(function(){
                                    $scene.hide();
                                    playSprite4(); 
                                }, 1000);
                            }, 2000);
                        }
                    }, 800)
                }
            });
            
            // 得到狗粮
            $dialogOptions.find('.yes').click(function(){
                $dialogL.hide();
                $dialogR.show();
                speak($dialogR.find('.vertical').html(''), '喵~');
                $dialogOptions.hide();///delay

                container.removeChild(daSprite);
                setTimeout(function(){
                    $dialogR.hide();
                    frame = 2;
                    spriteArr[2].gotoAndPlay('run2');
                }, 1400);
            });

            var $yesResult = $scene.find('.yes-result');
            var $failResult = $scene.find('.fail-result')
            $dialogOptions.find('.no').click(function(){
                audGameover.play();
                $failResult.show();
                $dialogOptions.hide();
            });
            $scene.find('.exit-btn').click(function(){
                gotoPlayAll();
                frame = 2;
                spriteArr[2].gotoAndPlay('run2');
                $failResult.hide();
            });
            $scene.find('.reselect').click(function(){
                $failResult.hide();
                $dialogOptions.show();
            });
        }

        // 情节四遇到家狗前
        function playSprite4(){
            var $scene = $('#scene3').show();
            var $dialogOptions = $scene.find('.dialog-options');
            var $dialogL = $scene.find('.l');
            var $dialogR = $scene.find('.r');
            var frame = 0;
            container.removeChild(spriteArr[2]);
            spriteArr[3].gotoAndStop(0);
            if(!throwAll){
                // $dialogR.show();
                // speak($dialogR.find('.vertical').html(''), '我是流浪汪，形只影又单，……')
                // .then(function(){
                //     $dialogR.hide();
                    
                // });
                spriteArr[3].gotoAndPlay('run');
                spriteArr[3].on('animationend', function(){
                    playSprite5();
                });
            }else{
                spriteArr[3].gotoAndPlay('run');
                spriteArr[3].on('animationend', function(){
                    playSprite5();
                });
            }
        }

        // 情节5遇到家狗
        var sprite5Frame = 0;
        function playSprite5(){
            var $scene = $('#scene3').show();
            var $dialogOptions = $scene.find('.dialog-options');
            var $dialogL = $scene.find('.l');
            var $dialogR = $scene.find('.r');
            container.addChild(spriteArr[4]);
            container.removeChild(spriteArr[3]);
            spriteArr[4].gotoAndPlay('run');
            spriteArr[4].on('animationend', function(){
                container.addChild(mojinSprite);
                mojinSprite.gotoAndPlay('run');

                if(sprite5Frame == 0){
                    if(!throwAll){
                        $dialogR.show();
                        speak($dialogR.find('.vertical').html(''), '同样是狗，你为啥就能喝酒，抽烟，烫头！')
                        .then(function(){
                            $dialogL.show();
                            $dialogR.hide();
                            return speak($dialogL.find('.vertical').html(''), '萌路漫漫而要修图兮，吾将上下而求粮……');
                        })
                        .then(function(){
                            $dialogL.hide();
                            $dialogR.show();
                            return speak($dialogR.find('.vertical').html(''), '……说狗话！');
                        })
                        .then(function(){
                            $dialogL.show();
                            $dialogR.hide();
                            return speak($dialogL.find('.vertical').html(''), '我会告诉你这年头只有po照当网红，才能赚大钱么？');
                        })
                        .then(function(){
                            $dialogL.hide();
                            $dialogR.show();
                            return speak($dialogR.find('.vertical').html(''), '！！！');
                        })
                        .then(function(){
                            $dialogR.hide();
                            audTalk.pause();
                            $dialogOptions.show();
                            sprite5Frame = 1;
                        })    
                    }else{
                        sprite5Frame = 1;
                        container.removeChild(mojinSprite);
                        audEffectGet.play();
                        $scene.find('.yes-result').show();
                        setTimeout(function(){
                           $scene.find('.yes-result').hide(); 
                           $scene.hide();
                           scene4Play();
                        }, 2000);
                    }
                }
            });
            
            // 得到狗粮
            $dialogOptions.find('.yes').click(function(){
                container.removeChild(mojinSprite);
                audEffectGet.play();
                $scene.find('.yes-result').show();
                $dialogOptions.hide();
                setTimeout(function(){
                   $scene.find('.yes-result').hide(); 
                   $scene.hide();
                   scene4Play();
                }, 2000);
                
            });
            
            var $yesResult = $scene.find('.yes-result');
            var $failResult = $scene.find('.fail-result')
            $dialogOptions.find('.no').click(function(){
                audGameover.play();
                $failResult.show();
                $dialogOptions.hide();
            });
            $scene.find('.exit-btn').click(function(){
                $failResult.hide();
                container.removeChild(mojinSprite);
                audEffectGet.play();
                gotoPlayAll();
                $scene.find('.yes-result').show();
                $dialogOptions.hide();
                setTimeout(function(){
                   $scene.find('.yes-result').hide(); 
                   $scene.hide();
                   scene4Play();
                }, 1000);
            });
            $scene.find('.reselect').click(function(){
                $failResult.hide();
                $dialogOptions.show();
            });
        }

        // 狗与开发者对话
        function scene4Play(){
            var $scene = $('#scene4').show();
            var $dialogL = $scene.find('.l');
            var $dialogR = $scene.find('.r');
            if(!throwAll){
                $dialogR.show();
                speak($dialogR.find('.vertical').html(''), '集齐了3个线索，是不是可以召唤神龙了？')
                .then(function(){
                    $dialogL.show();
                    $dialogR.hide();
                    return speak($dialogL.find('.vertical').html(''), '恭喜你！你是通关的第163只流浪汪，前面的救助站会收留你。');
                })
                .then(function(){
                    return speak($dialogL.find('.vertical').html(''), '只要对镜头卖个萌，就有好心人给所有流浪猫狗捐口粮哦。');
                })
                .then(function(){
                    $dialogL.hide();
                    $dialogR.hide();
                    $scene.hide();
                    scene4PlayEnd();
                })
            }else{
                $scene.hide();
                scene4PlayEnd();
            }
        }

        // 开发者对话结束后播放
        function scene4PlayEnd(){
            spriteArr[4].gotoAndPlay('run1');
            spriteArr[4].on('animationend', function(){
                playSprite6();
            });
        }

        // 去流浪救助站
        function playSprite6(){
            var $scene = $('#scene5').show();
            var $dialogOptions = $scene.find('.dialog-options');
            container.addChild(spriteArr[5]);
            container.removeChild(spriteArr[4]);
            spriteArr[5].gotoAndPlay('run');
            spriteArr[5].on('animationend', function(){
                audTalk.pause();
                // audPlot.pause();
                // audGotoend.pause();
                $dialogOptions.show();
            });
            window.shareData = {
                title: txt
                ,desc: shareConent
                ,link: location.href.split('#')[0]
                ,timeLineLink: location.href.split('#')[0]
                ,sendFriendLink: location.href.split('#')[0]
                ,tContent: shareConent
                ,tTitle: txt
                ,fContent: shareConent
                ,fTitle: txt
                ,imgUrl: document.getElementById('shareLogo').src
                ,success: function(){
                    window.location.href = 'https://x.163.com/marketinglive/vote/petscare/h5.html';
                    if(window._hmt){
                        _hmt.push(['_trackEvent', 'shareTimelinePet', 'click','myshare']);
                    }
                }
            };
            if(window.share_demo){
                //分享按钮绑定share事件
                document.getElementById('shareBtn').addEventListener('click', function(){
                    share_demo.share();
                });
                share_demo.update({
                    title: txt,
                    desc: shareConent,
                    wbText: txt,
                    wbImg: 'http://xd.geekyy.com/pet/img/share-logo.jpg?t=1461493151',
                    img: 'http://xd.geekyy.com/pet/img/share-logo.jpg?t=1461493151',
                    callback: function(spsf) {
                        spsf = spsf || 'other'
                        window.location.href = 'https://x.163.com/marketinglive/vote/petscare/h5.html';
                    }
                });
            }
            
        }

        // 开始
        $('.startBtn').click(function(){
            audEffectStart.pause();
            $('#pageStart').hide();
            audPlot.volume = 0.08;
            audPlot.play();
            var $p = $('<p>');
            var $page1Texts = $('#page1Texts');
            $page1Texts.append($p);
            speak($p, '风后面是风', true)
            .then(function(){
                var $p = $('<p>');
                $page1Texts.append($p);
                return speak($p, '天空上面是天空', true);
            })
            .then(function(){
                var $p = $('<p>');
                $page1Texts.append($p);
                return speak($p, '道路前面还是道路', true);
            })
            .then(function(){
                var $p = $('<p>');
                $page1Texts.append($p);
                return speak($p, '流浪汪又要开始寻粮了', true);
            })
            .then(function(){
                var $page1 = $('#page1');
                $page1.addClass('fadeOut');
                setTimeout(function(){
                    $page1.hide();
                }, 500);
                playSprite1();
            });
        });

    }

    loader().done(function(){
        $wrap.append($('#tmpl').html());
    	$wrap.show();
    	initApp();
    });
});