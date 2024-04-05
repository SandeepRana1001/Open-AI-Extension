const generateCode = document.getElementById('generateCode');
const prompt_input_box = document.getElementById('prompt')
const success_message = document.getElementById('success-message');

prompt_input_box.addEventListener('keyup', (e) => {
    const value = e.target.value.trim();
    const counter = document.getElementById('min-words_counter');
    if (value.length > 0) {
        if (value.length < 11) {
            counter.innerHTML = value.length;
        }
    } else {
        counter.innerHTML = 0;
    }

})

generateCode.addEventListener('click', async () => {
    const error_message_holder = document.getElementById('error-message_holder');
    const error = document.getElementById('error-message');
    const prompt = prompt_input_box.value.trim();

    if (prompt.length == 0) {
        error_message_holder.innerText = 'Please provide a valid prompt';
        error.style.opacity = 1;
    } else if (prompt.length < 10) {
        error_message_holder.innerText = 'Prompt must be at least 10 characters';
        error.style.opacity = 1;
    } else if (prompt.length > 10) {
        error_message_holder.innerText = '';
        error.style.opacity = 0;
        await fetchResponseFromGPT(prompt)
    }
});

const copyData = async (data) => {
    try {

        navigator.clipboard.writeText(data);
        success_message.style.opacity = 1
        setTimeout(() => {
            success_message.style.opacity = 0;

        }, 2000)
    } catch (err) {
    }
}


const fetchResponseFromGPT = async (prompt) => {

    var auth_header = 'Bearer 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';
    var body = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {
                "role": "system",
                "content": "You are a coding assistant, skilled in providing code for complex coding scenarios.You will only provide code, no other information. Only code and no other string and no other information"
            },
            {
                "role": "user",
                "content": prompt
            }
        ]
    };
    var payload = {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
            'Authorization': auth_header
        },
        body: JSON.stringify(body),
    }
    const request = await fetch('https://api.openai.com/v1/chat/completions', payload);
    const response = await request.json();
    const output = response.choices[0].message.content;
    console.log(output);
    await copyData(output);
}
