/**
 * 复制文本
 * @param text 
 */
export function copyText(text) {
  return new Promise((resolve) => {
    // console.log('copy', navigator.clipboard)
    if (!navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        resolve(true);
      }).catch(() => {
        resolve(false);
      });
    } else {
      try {
        var textarea = document.createElement('textarea');
        document.body.appendChild(textarea);
        // 隐藏此输入框
        textarea.style.position = 'fixed';
        textarea.style.clip = 'rect(0 0 0 0)';
        textarea.style.top = '10px';
        // 赋值
        textarea.value = text;
        // 选中
        textarea.select();
        // 复制
        document.execCommand('copy', true);
        // 移除输入框
        document.body.removeChild(textarea);
        resolve(true);
      }
      catch(err){
        resolve(false);
      }
    }
  });
}

export const rgbToString = (obj) => {
	return `rgb(${obj.r}, ${obj.g}, ${obj.b})`
}

export const rgbaToString = (obj) => {
	return `rgba(${obj.r}, ${obj.g}, ${obj.b}, ${obj.a})`
}

export const cmykToString = (obj) => {
	return `cmyk(${obj.c}, ${obj.m}, ${obj.y}, ${obj.k})`
}

export const hslToString = (obj) => {
	return `hsl(${obj.h}, ${obj.s}, ${obj.l})`
}

export const hslaToString = (obj) => {
	return `hsla(${obj.h}, ${obj.s}, ${obj.l}, ${obj.a})`
}