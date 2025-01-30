<script lang="ts">
	import svelte from '../public/img/svelte.svg';
	import { signIn } from '$lib/auth';
	import { signUp } from '$lib/auth';
	import { base } from '$app/paths';

	//setting up states for reactivity
	let showRegisterModal = $state(false);

	//registration state declaration
	let register_username = $state('');
	let register_password = $state('');

	//sign in states
	let username = $state('');
	let password = $state('');

	//other miscellaneous states for error and loading
	let isLoading = $state(false);
	let error = $state<string | null>(null);

	//function for handling the login process
	async function handleLogin() {
		isLoading = true; //setting up loading state if login takes time
		error = null;

		try {
			await signIn(username, password); //taking in the reactive values in the forms
			window.location.href = `${base}/blog`; // updated path
		} catch (e) {
			error = (e as Error).message;
		} finally {
			isLoading = false;
		}
	}

	//handling the registration process
	async function handleRegister(event: SubmitEvent) {
		event.preventDefault();
		isLoading = true; //setting up loading state if registration takes time
		error = null;

		try {
			await signUp(register_username, register_password); //taking in the reactive values in the forms
			window.location.href = `${base}/blog`; // Updated path
		} catch (e) {
			error = (e as Error).message;
		} finally {
			isLoading = false;
		}
	}
</script>

<main class="flex h-screen flex-col bg-gradient-to-tr from-orange-300 to-yellow-100 md:flex-row">
	<!-- left side with image -->
	<div class="flex h-1/3 w-full items-center justify-center md:h-full md:w-7/12">
		<img src={svelte} alt="Blog welcome image" class="h-40 w-40 md:h-80 md:w-80" />
	</div>

	<!-- right side with login form -->
	<div class="flex w-full items-center justify-center md:w-5/12">
		<div
			class="container flex w-11/12 flex-col items-center justify-center rounded-lg bg-white p-4 shadow-lg md:w-8/12 md:p-8"
		>
			<div class="flex flex-col items-center justify-center space-y-4">
				<h1 class="text-center text-2xl font-bold">Welcome to SvelteBlog</h1>

				<fieldset>
					<label for="username">
						<input
							type="text"
							id="username"
							bind:value={username}
							disabled={isLoading}
							name="username"
							placeholder="Username"
							class="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</label>
				</fieldset>

				<fieldset>
					<label for="password">
						<input
							type="password"
							id="password"
							bind:value={password}
							disabled={isLoading}
							name="password"
							placeholder="Password"
							class="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</label>
				</fieldset>

				<button
					type="button"
					onclick={handleLogin}
					disabled={isLoading}
					class="w-50 rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300"
				>
					{isLoading ? 'Logging in...' : 'Login'}
				</button>

				<p class="text-sm text-gray-500">
					Don't have an account?
					<button class="text-blue-500 hover:underline" onclick={() => (showRegisterModal = true)}>
						Register
					</button>
				</p>
			</div>
		</div>
	</div>
</main>

{#if showRegisterModal}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
		<div class="w-full max-w-sm rounded-lg bg-white p-4 shadow-xl md:w-96 md:p-8">
			<div class="mb-6 flex justify-between">
				<h2 class="text-xl font-bold">Register</h2>
				<button
					class="text-gray-500 hover:text-gray-700"
					onclick={() => (showRegisterModal = false)}
					disabled={isLoading}
				>
					✕
				</button>
			</div>

			{#if error}
				<div class="mb-4 rounded-md bg-red-50 p-4 text-red-500">
					{error}
				</div>
			{/if}

			<form class="space-y-4" onsubmit={handleRegister}>
				<fieldset>
					<label for="register-username">
						<input
							type="text"
							id="register-username"
							bind:value={register_username}
							placeholder="Username"
							class="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
							disabled={isLoading}
						/>
					</label>
				</fieldset>

				<fieldset>
					<label for="register-password">
						<input
							type="password"
							id="register-password"
							bind:value={register_password}
							placeholder="Password"
							class="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
							disabled={isLoading}
						/>
					</label>
				</fieldset>

				<button
					type="submit"
					class="w-full rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 disabled:opacity-50"
					disabled={isLoading}
				>
					{isLoading ? 'Creating Account...' : 'Create Account'}
				</button>
			</form>
		</div>
	</div>
{/if}
