<script setup lang="ts">
import { ref, watch } from 'vue';
import { Input as AInput, Button as AButton, message, Form as AForm, FormItem, InputGroup, ColorPicker as AColorPicker } from 'ant-design-vue';
import { Vue3ColorPicker } from '@cyhnkckali/vue3-color-picker';
// import convert from 'color-convert';
import * as convert from 'colors-convert';
import { CopyOutlined } from '@ant-design/icons-vue';
import { 
	copyText,
	rgbToString,
	rgbaToString,
	cmykToString,
	hslToString,
	hslaToString
} from '../utils/utils.js';

import '@cyhnkckali/vue3-color-picker/dist/style.css'

const labelCol = { span: 3 };
const wrapperCol = { span: 21 };
const formState = ref({
  color16: '',
  colorrgb: '',
  colorrgba: '',
  colorhsl: '',
  colorhsla: '',
  colorcmyk: '',
});

const colorPickerRef = ref('rgba(255, 255, 255, 1)');

/**
 * 颜色转换
 * @param {string} type
 */
const colorComputed = (type: string) => {
  try {
    switch(type) {
      case 'color16':
		console.log('---- color16 ----', convert.hexToRgb(formState.value.color16))
        formState.value.colorrgb = rgbToString(convert.hexToRgb(formState.value.color16));
        formState.value.colorrgba = rgbaToString(convert.hexToRgba(formState.value.color16));
        formState.value.colorhsl = hslToString(convert.hexToHsl(formState.value.color16));
        formState.value.colorhsla = hslaToString(convert.hexToHsla(formState.value.color16));
        formState.value.colorcmyk = cmykToString(convert.hexToCmyk(formState.value.color16));
        break;
      case 'colorrgb':
		const rgbArr = formState.value.colorrgb.match(/(\d+)/g);
		const rgbObj = {
			r: +rgbArr[0],
			g: +rgbArr[1],
			b: +rgbArr[2]
		}
		formState.value.colorrgba = rgbaToString(convert.rgbToRgba(rgbObj));
        formState.value.color16 = convert.rgbToHex(rgbObj);
        formState.value.colorhsl = hslToString(convert.rgbToHsl(rgbObj));
        formState.value.colorhsla = hslaToString(convert.rgbToHsla(rgbObj));
        formState.value.colorcmyk = cmykToString(convert.rgbToCmyk(rgbObj));
        break;
      case 'colorhsl':
		  const hslArr = formState.value.colorhsl.match(/(\d+)/g);
		  const hslObj = {
			h: +hslArr[0],
			s: +hslArr[1],
			l: +hslArr[2]
		  }
        formState.value.color16 = convert.hslToHex(hslObj);
        formState.value.colorrgb = rgbToString(convert.hslToRgb(hslObj));
        formState.value.colorrgba = rgbaToString(convert.hslToRgba(hslObj));
        formState.value.colorhsla = hslaToString(convert.hslToHsla(hslObj));
        formState.value.colorcmyk = cmykToString(convert.hslToCmyk(hslObj));
        break;
      case 'colorhsla':
		const hslaArr = formState.value.colorhsla.match(/(\d+)/g);
		const hslaObj = {
			h: +hslaArr[0],
			s: +hslaArr[1],
			l: +hslaArr[2],
			a: +hslaArr[3]
		}
        formState.value.color16 = convert.hslaToHex(hslaObj);
        formState.value.colorrgb = rgbToString(convert.hslaToRgb(hslaObj));
        formState.value.colorrgba = rgbToString(convert.hslaToRgba(hslaObj));
        formState.value.colorhsl = hslaToString(convert.hslaToHsl(hslaObj));
        formState.value.colorcmyk = cmykToString(convert.hslaToCmyk(hslaObj));
        break;
	  case 'colorcmyk':
		const cmykArr = formState.value.colorcmyk.match(/(\d+)/g);
		const cmykObj = {
			c: +cmykArr[0],
			m: +cmykArr[1],
			y: +cmykArr[2],
			k: +cmykArr[3]
		}
		  formState.value.color16 = convert.cmykToHex(cmykObj);
		  formState.value.colorrgb = rgbToString(convert.cmykToRgb(cmykObj));
		  formState.value.colorrgba = rgbaToString(convert.cmykToRgba(cmykObj));
		  formState.value.colorhsl = hslaToString(convert.cmykToHsl(cmykObj));
		  formState.value.colorcmyk = cmykToString(convert.cmykToCmyk(cmykObj));
		  break;
      default:
        break;
    }
    message.success('转换成功');
  }
  catch(err){
    message.error('转换失败');
  }
}

/**
 * 复制颜色值
 * @param {String} text
 * @param {String} type
 * @returns
 */
const copyAction = (text: string, type: string) => {
  let copyTextTemp = text;
  switch(type) {
    case 'color16':
      if(copyTextTemp.indexOf('#') === -1) {
        copyTextTemp = `#${text}`;
      }
      break;
    case 'colorrgb':
      if(copyTextTemp.indexOf('rgb') === -1) {
        copyTextTemp = `rgb(${text})`;
      }
      break;
    case 'colorhsl':
      if(copyTextTemp.indexOf('hsl') === -1) {
        copyTextTemp = `hsl(${text})`;
      }
      break;
    case 'colorhsv':
      if(copyTextTemp.indexOf('hsv') === -1) {
        copyTextTemp = `hsv(${text})`;
      }
      break;
    case 'colorcmyk':
      if(copyTextTemp.indexOf('cmyk') === -1) {
        copyTextTemp = `cmyk(${text})`;
      }
      break;
    default:
      break;
  }
  copyText(copyTextTemp).then(() => {
    message.success('复制成功');
  }).catch(err => {
    message.error('复制失败，可手动选择复制');
    console.log('---- copyText ----:', err);
  });
}

watch(colorPickerRef, (newVal, oldVal) => {
  console.log('---- watch ----:colorPickerRef', newVal, oldVal);
  const rgbaArr = newVal.match(/(\d+)/g);
  const rgbaObj = {
  	r: +rgbaArr[0],
  	g: +rgbaArr[1],
  	b: +rgbaArr[2],
  	a: +rgbaArr[3]
  }
  formState.value.color16 = convert.rgbaToHex(rgbaObj);
  formState.value.colorrgb = rgbToString(convert.rgbaToRgb(rgbaObj));
  formState.value.colorrgba = newVal;
  formState.value.colorhsl = hslToString(convert.rgbaToHsl(rgbaObj));
  formState.value.colorhsla = hslaToString(convert.rgbaToHsla(rgbaObj));
  formState.value.colorcmyk = cmykToString(convert.rgbaToCmyk(rgbaObj));
});

const tipss = ref(['支持表单输入值后失去焦点自动转换','支持picker选择颜色后自动转换','支持一键复制转换结果']);
</script>

<template>
  <div class="flex flex-col w-full h-screen p-[10px] box-border">
    <div class="flex flex-col w-full">
      <div class="flex flex-row items-center pb-[20px] justify-center w-full flex-none ml-[8px]">
		  <div class="w-[360px] flex flex-col items-center">
			<h3 class="text-black text-[16px] font-normal mb-[10px]">颜色选取</h3>
			<Vue3ColorPicker 
				v-model="colorPickerRef" 
				mode="solid" 
				:showColorList="true" 
				:showEyeDrop="true" 
				type="RGBA"
			/>
		  </div>
		  <div class="w-[168px] flex flex-col flex-none items-center">
			<h3 class="text-black text-[16px]  font-normal mb-[10px]">颜色预览</h3>
			<div class="w-[100px] h-[100px] border-2 border-gray-200 border-dashed mb-[10px]">
			  <div class="w-full h-full" :style="{backgroundColor: formState.color16}"></div>
			</div>
		  </div>
		  <ul class="list-none text-[14px] text-[#989898]">
		    <li v-for="(item, index) in tipss" :key="index" class="mb-[5px]">
		      {{index + 1}}. {{ item }}
		    </li>
		  </ul>
      </div>
      <a-form style="flex: 1" :label-col="labelCol" :wrapper-col="wrapperCol">
        <form-item label="16进制颜色">
          <input-group compact size="large">
            <a-input 
              v-model:value="formState.color16"
              @blur="colorComputed('color16')" 
              style="width: calc(100% - 32px)"
              placeholder="请输入16进制颜色,如#ff0000,ff0000"
            />
            <a-button @click="copyAction(formState.color16, 'color16')">
              <template #icon>
                <CopyOutlined />
              </template>
            </a-button>
          </input-group>
        </form-item>
        <form-item label="RGB颜色">
          <input-group compact  size="large">
            <a-input 
              v-model:value="formState.colorrgb"
              @blur="colorComputed('colorrgb')" 
              style="width: calc(100% - 32px)"
              placeholder="请输入RGB颜色,如rgb(0,255,0)"
            />
            <a-button @click="copyAction(formState.colorrgb, 'colorrgb')">
              <template #icon>
                <CopyOutlined />
              </template>
            </a-button>
          </input-group>
        </form-item>
		<form-item label="RGBA颜色">
		  <input-group compact  size="large">
		    <a-input 
		      v-model:value="formState.colorrgba"
		      @blur="colorComputed('colorrgba')" 
		      style="width: calc(100% - 32px)"
		      placeholder="请输入RGBA颜色,如rgba(0, 255, 0, 1) / 0, 255, 0, 1"
		    />
		    <a-button @click="copyAction(formState.colorrgba, 'colorrgba')">
		      <template #icon>
		        <CopyOutlined />
		      </template>
		    </a-button>
		  </input-group>
		</form-item>
        <form-item label="HSL颜色">
          <input-group compact size="large">
            <a-input 
              v-model:value="formState.colorhsl"
              @blur="colorComputed('colorhsl')"  
              style="width: calc(100% - 32px)"
              placeholder="请输入HSL颜色,如hsl(120, 100, 50) / 120, 100, 50"
            />
            <a-button @click="copyAction(formState.colorhsl, 'colorhsl')">
              <template #icon>
                <CopyOutlined />
              </template>
            </a-button>
          </input-group>
        </form-item>
        <form-item label="HSLA颜色">
          <input-group compact size="large">
            <a-input 
              v-model:value="formState.colorhsla" 
              @blur="colorComputed('colorhsla')" 
              style="width: calc(100% - 32px)"
              placeholder="请输入HSVA颜色,如hsla(120, 100, 50, 1) / 120, 100, 50, 1"
            />
            <a-button @click="copyAction(formState.colorhsla, 'colorhsla')">
              <template #icon>
                <CopyOutlined />
              </template>
            </a-button>
          </input-group>
        </form-item>
		<form-item label="CMYK颜色">
		  <input-group compact size="large">
		    <a-input 
		      v-model:value="formState.colorcmyk" 
		      @blur="colorComputed('colorcmyk')" 
		      style="width: calc(100% - 32px)"
		      placeholder="请输入cmyk颜色,如cmyk(100, 0, 100, 0) / 100, 0, 100, 0"
		    />
		    <a-button @click="copyAction(formState.colorcmyk, 'colorcmyk')">
		      <template #icon>
		        <CopyOutlined />
		      </template>
		    </a-button>
		  </input-group>
		</form-item>
      </a-form>
    </div>
  </div>
</template>

<style scoped>

</style>
