const generateCode = document.getElementById('generateCode');
const prompt_text_area = document.getElementById('prompt')
const prompt = prompt_text_area.value.trim();

// prompt_text_area.addEventListener('keyup', (e) => {
//     const value = e.target.value.trim();
//     const counter = document.getElementById('min-words_counter');
//     console.log(value);
//     if (value.length > 0) {
//         if (value.length < 11) {
//             counter.innerHTML = value.length;
//         }
//     } else {
//         counter.innerHTML = 0;
//     }

// })

generateCode.addEventListener('click', async () => {
    const error_message_holder = document.getElementById('error-message_holder');
    const error = document.getElementById('error-message');
    console.log(prompt_text_area)
    copyData(prompt)

    // if (prompt.length == 0) {
    //     error_message_holder.innerText = 'Please provide a valid prompt';
    //     error.style.visibility = 'none';
    // } else if (prompt.length < 10) {
    //     error_message_holder.innerText = 'Prompt must be at least 10 characters';
    //     error.style.visibility = 'none';
    // } else {
    //     error_message_holder.innerText = '';
    //     error.style.visibility = 'hidden';
    //     await copyData(prompt)
    // }
});

const copyData = async (data) => {
    try {

        navigator.clipboard.writeText(data);
        // alert('Copied text: ' + data);

    } catch (err) {
        console.log(err)
    }
}


const fetchResponseFromGPT = async (prompt) => {

    var key = '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';
    var body = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {
                "role": "system",
                "content": "You are a coding assistant, skilled in providing code for complex coding scenarios"
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
            'Authorization': `Bearer ${key}`
        },
        body: JSON.stringify(body),
    }
    const request = await fetch('https://api.openai.com/v1/chat/completions', payload);
    const response = await request.json();
    console.log(response);
    const output = response.choices[0].message.content;
    console.log(output);
}
// async function get() {
//     await fetchResponseFromGPT('Tell me about Javascript in 200 words')

// }

// get()
