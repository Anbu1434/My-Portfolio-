const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const socialIcons = document.querySelector('.social-icons');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  socialIcons.classList.toggle('active');
  hamburger.querySelector('i').classList.toggle('fa-bars');
  hamburger.querySelector('i').classList.toggle('fa-times');
});
function copyEmail() {
  const email = "anbarasan0909@gmail.com";
  navigator.clipboard.writeText(email).then(() => {
    const msg = document.getElementById("copy-msg");
    msg.style.opacity = 1;
    setTimeout(() => {
      msg.style.opacity = 0;
    }, 1500);
  }).catch(err => {
    console.error("Failed to copy email: ", err);
  });
}
document.querySelectorAll('.project-link').forEach(link => {
  link.addEventListener('mouseenter', () => link.innerText = "Visit Project →");
  link.addEventListener('mouseleave', () => link.innerText = "Check Live Site →");
});
const observerOptions = {
  rootMargin: '0px 0px -100px 0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(".experience-card").forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(40px)";
  card.style.transition = "all 0.8s ease";
  observer.observe(card);
});

AOS.init({
  duration: 1000,
  easing: 'ease-in-out',
  once: true,
  mirror: false
});

document.getElementById("chat-float").addEventListener("click", () => {
  document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
});

const chatFloat = document.getElementById("chat-float");
const chatContainer = document.getElementById("chatbot-container");
const closeChat = document.getElementById("close-chat");
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBody = document.getElementById("chatbot-body");


const animation = lottie.loadAnimation({
  container: document.getElementById("lottie-chat"),
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "./hello animation.json",
});


const lottieContainer = document.getElementById("lottie-chat");
lottieContainer.addEventListener("mouseenter", () => animation.play());
lottieContainer.addEventListener("mouseleave", () => animation.stop());



chatFloat.addEventListener("click", () => {
  chatContainer.style.display = "flex";
  chatFloat.style.display = "none";
});

closeChat.addEventListener("click", () => {
  chatContainer.style.display = "none";
  chatFloat.style.display = "flex";
});


function appendMessage(content, sender) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add(sender === "user" ? "user-msg" : "bot-msg");
  msgDiv.innerText = content;
  chatBody.appendChild(msgDiv);
  chatBody.scrollTo({
    top: chatBody.scrollHeight,
    behavior: "smooth",
  });
}


sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});


async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  // Append user message
  appendMessage(message, "user");
  userInput.value = "";

  // Append typing indicator
  const typingDiv = document.createElement("div");
  typingDiv.classList.add("bot-msg");
  typingDiv.innerText = "Typing...";
  chatBody.appendChild(typingDiv);
  chatBody.scrollTop = chatBody.scrollHeight;

  try {
    const res = await fetch("http://127.0.0.1:8000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: message })
    });
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    typingDiv.remove();

    if (data.answer && data.answer.trim() !== "") {
      appendMessage(data.answer, "bot");
    } else {
      appendMessage("🤖 Sorry, I couldn’t understand that.", "bot");
    }
  } catch (error) {
    typingDiv.remove();
    console.error("Chatbot connection error:", error);
    appendMessage("⚠️ Unable to connect to chatbot server. Try again later.", "bot");
  }
}

document.addEventListener("keydown", e => {
  if (
    e.key === "F12" ||
    (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) ||
    (e.ctrlKey && e.key === "U")
  ) {
    e.preventDefault();
  }
});

// loading animation 

window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";

});

document.addEventListener("contextmenu", e => {
  e.preventDefault();
});