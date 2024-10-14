export async function getAIResponse(message: string): Promise<string> {
    // This is a mock AI response. Replace this with an actual API call to your AI service.
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
    return `AI response to: "${message}". This is a placeholder response.`;
}