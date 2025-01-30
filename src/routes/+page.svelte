<script lang="ts">
	import svelte from '../public/img/svelte.svg';

	//setting up states for reactivity
	let showRegisterModal = $state(false);
	let register_username = $state('');
	let register_password = $state('');

</script>

<main class="flex h-screen bg-gradient-to-tr from-orange-300 to-yellow-100">
	<!-- Left side with image -->
	<div class="flex h-full w-7/12 items-center justify-center">
		<img src={svelte} alt="Blog welcome image" class="h-80 w-80" />
	</div>

	<!-- Right side with login form -->
	<div class="flex w-5/12 items-center justify-center">
		<div
			class="container flex w-8/12 flex-col items-center justify-center rounded-lg bg-white p-8 shadow-lg"
		>
			<div class="flex flex-col items-center justify-center space-y-4">
				<h1 class="text-center text-2xl font-bold">Welcome to SvelteBlog</h1>

				<fieldset>
					<label for="username">
						<input
							type="text"
							id="username"
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
							name="password"
							placeholder="Password"
							class="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</label>
				</fieldset>

				<button
					type="button"
					class="w-50 rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300"
				>
					Login
				</button>

				<p class="text-sm text-gray-500">
					Don't have an account?
					<button class="text-blue-500 hover:underline" onclick={() => showRegisterModal = true}> Register </button>
				</p>
			</div>
		</div>
	</div>
</main>

{#if showRegisterModal}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
		<div class="w-96 rounded-lg bg-white p-8 shadow-xl">
			<div class="mb-6 flex justify-between">
				<h2 class="text-xl font-bold">Register</h2>
				<button class="text-gray-500 hover:text-gray-700" onclick={() => showRegisterModal = false}> ✕ </button>
			</div>

			<form class="space-y-4">
				<fieldset>
					<label for="register-username">
						<input
							type="text"
							bind:value={register_username}
							id="register-username"
							name="register-username"
							placeholder="Username"
							class="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
						/>
					</label>
				</fieldset>

				<fieldset>
					<label for="register-password">
						<input
							type="password"
							bind:value={register_password}
							id="register-password"
							name="register-password"
							placeholder="Password"
							class="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
						/>
					</label>
				</fieldset>

				<button
					type="submit"
					class="w-full rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300"
				>
					Create Account
				</button>
			</form>
		</div>
	</div>
{/if}
