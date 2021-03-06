import { run } from '../../editor/ScriptRunner/run'
import { createEnv } from './env'
import { TUIStore } from '../UI/store'
import { IDisposable } from '../../Types/disposable'

export async function executeScript(
	code: string,
	uiStore: TUIStore,
	disposables: IDisposable[]
) {
	return await run(code, createEnv(uiStore, disposables), {
		executionContext: 'file',
		envName: 'require',
		async: true,
	})
}
