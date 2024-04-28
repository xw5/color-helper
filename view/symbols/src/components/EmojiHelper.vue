<template>
	<div class="w-full h-screen flex flex-col items-center justify-center overflow-hidden">

	</div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { message, Tabs as ATabs, TabPane as ATabPane } from 'ant-design-vue';
import { copyText } from '../utils/utils.js';

/**
 * 复制
 * @param {string} text
 */
const copy = (text) => {
  console.log('---- copy ----:', text);
  copyText(text).then(() => {
    message.success('复制成功');
  }).catch(err => {
    message.error('复制失败，可手动选择复制');
    console.log('---- copyText ----:', err);
  });
  if (hbuilderx) {
	  hbuilderx.postMessage({
		command: 'insert',
		data: text
	  });
  }
};

onBeforeMount(() => {
	window.addEventListener('hbuilderxReady', () => {
		if (hbuilderx) {
			hbuilderx.onDidReceiveMessage((msg)=>{
				console.log('msg: ', msg);
				if(msg.type == 'DialogButtonEvent'){
					let button = msg.button;
					if(button == '关闭'){
						hbuilderx.postMessage({
							command: 'closed'
						});
					};
				};
			});
		}
	})
})
</script>

<style scoped lang="scss">

</style>