<script lang="ts">
	import svelte from '../public/img/svelte.svg';
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
					Don't have an account? <a href="/register" class="text-blue-500 hover:underline"
						>Register</a
					>
				</p>
				<!-- create a modal for registration later -->
			</div>
		</div>
	</div>
</main>
