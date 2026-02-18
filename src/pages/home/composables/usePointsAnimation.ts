/**
 * 积分数字动画组合式函数
 */

import { ref, computed } from 'vue';

interface UsePointsAnimationOptions {
  /** 动画持续时间（毫秒） */
  duration?: number;
}

export function usePointsAnimation(targetPoints: number, options: UsePointsAnimationOptions = {}) {
  const { duration = 1500 } = options;
  
  const displayPoints = ref(0);
  
  const displayAmount = computed(() => {
    return (displayPoints.value / 100).toFixed(2);
  });

  // easeOutExpo 缓动函数
  const easeOutExpo = (x: number): number => {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
  };

  const animate = () => {
    displayPoints.value = 0;
    const startTime = Date.now();
    
    const update = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      displayPoints.value = Math.floor(easeOutExpo(progress) * targetPoints);
      
      if (progress < 1) {
        setTimeout(update, 16); // 模拟 60fps
      }
    };
    
    update();
  };

  const reset = () => {
    displayPoints.value = 0;
  };

  return {
    displayPoints,
    displayAmount,
    animate,
    reset,
  };
}

export default usePointsAnimation;
