// 聊天机器人主逻辑 - 固定回复版本

// DOM元素获取
const chatbotIcon = document.getElementById('chatbotIcon');
const chatbotPopup = document.getElementById('chatbotPopup');
const closePopup = document.getElementById('closePopup');
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

// 交互：点击图标显示/隐藏弹窗
chatbotIcon.addEventListener('click', () => {
  chatbotPopup.style.display = 
    chatbotPopup.style.display === 'flex' ? 'none' : 'flex';
});
closePopup.addEventListener('click', () => {
  chatbotPopup.style.display = 'none';
});

// 发送消息（修改为固定回复逻辑）
async function sendMessageToAI(message) {
  // 显示用户消息
  appendMessage(message, 'user');
  
  // 定义固定回复话术
  const fixedReply = "灵宝AI还在部分调试阶段，只有内测用户才可以开启正常聊天，如果非内测人员，可以发QQ邮箱联系我哦~";
  
  // 模拟思考延迟（增强交互体验）
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // 显示固定回复
  appendMessage(fixedReply, 'ai');
}

// 绑定发送事件（点击按钮或回车）
sendBtn.addEventListener('click', () => {
  const message = userInput.value.trim();
  if (message) {
    userInput.value = '';
    sendMessageToAI(message);
  }
});

userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const message = userInput.value.trim();
    if (message) {
      userInput.value = '';
      sendMessageToAI(message);
    }
  }
});

// 辅助函数：添加消息到聊天窗口
function appendMessage(content, role) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${role}`;
  messageDiv.textContent = content;
  chatMessages.appendChild(messageDiv);
  
  // 自动滚动到底部
  chatMessages.scrollTop = chatMessages.scrollHeight;
}