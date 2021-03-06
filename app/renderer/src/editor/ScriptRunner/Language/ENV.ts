import { languages } from 'monaco-editor'
import Provider from '../../../autoCompletions/Provider'
import { IDisposable } from '../../../Types/disposable'
import TextProvider from '../../../autoCompletions/TextProvider'
import ProjectConfig from '../../../Project/Config'
const PROVIDER = new Provider()

export const ENV = (disposables: IDisposable[], language: string) => {
	languages.register({ id: language, extensions: [language] })

	return {
		AutoCompletions: {
			Text: {
				get(line: string, startState: string) {
					return TextProvider.compile(line, undefined, startState)
				},
			},
			eval(path: string) {
				return PROVIDER.omegaExpression(path)
			},
			get(path: string) {
				return PROVIDER.get(path)
			},
		},
		Project: {
			getPrefix() {
				return ProjectConfig.getPrefixSync()
			},
		},
		registerTokens(tokens: languages.IMonarchLanguage) {
			disposables.push(
				languages.setMonarchTokensProvider(language, tokens)
			)
		},
		registerCompletionProvider(provider: languages.CompletionItemProvider) {
			disposables.push(
				languages.registerCompletionItemProvider(language, provider)
			)
		},
	}
}
