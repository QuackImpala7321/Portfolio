const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function getJson(path: string): Promise<any> {
    const contents = await fetch(path)
    return await contents.json()
}

export function validEmail(s: string) {
	return emailRegex.test(s)
}