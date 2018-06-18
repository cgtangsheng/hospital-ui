<template>
    <div>
        <div id="mod_player"></div>
    </div>
</template>
<script type="application/javascript">
    import $ from "zeptojs";
    import { Toast } from 'mint-ui';
    import { tvp } from "../../common/js/tvp.player_v2"
    export default{
        data(){
            return {

            }
        },
        methods:{
        },
        created:function () {
            var video = new tvp.VideoInfo();
            video.setVid("c0146k6imdf");
            var player =new tvp.Player();
            player.create({
                width:480,
                height:360,
                video:video,
                modId:"mod_player",
                autoplay:true,
                plugins: {
                    AppBannerOnPause: true
                }
            });
        },
        monted:function () {
//            var video = new tvp.VideoInfo();
//            video.setVid("c0146k6imdf");
//            var player =new tvp.Player();
//            player.create({
//                width:480,
//                height:360,
//                video:video,
//                modId:"mod_player",
//                autoplay:true,
//                plugins: {
//                    AppBannerOnPause: true
//                }
//            });
        }

    }
</script>