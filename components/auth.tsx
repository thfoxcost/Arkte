"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError } from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { DecorIcon } from "@/components/ui/decor-icon";
import { Button } from "@/components/ui/button";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import { EyeIcon, EyeOffIcon, Loader2, Mail } from "lucide-react";
import { FieldDescription, FieldLabel } from "./ui/field";
import { signIn, signUp } from "@/server/users";
import * as z from "zod";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { AspectRatio } from "./ui/aspect-ratio";
import Image from "next/image";
import { useState } from "react";
import router from "next/dist/client/router";
import { useRouter } from "next/navigation";

const formSchema = z.object({
	email: z
		.string()
		.email("Please enter a valid email address.")
		.min(5, "Email must be at least 5 characters.")
		.max(100, "Email must be at most 100 characters."),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters.")
		.max(100, "Password must be at most 100 characters."),
});

export function AuthPage() {
	const router = useRouter();
	async function onSubmit(data: z.infer<typeof formSchema>) {
		setIsLoading(true);
		const { success, message } = await signIn(data.email, data.password);
		if (success) {
			toast.success(message as string);
			router.push("/dashboard");
		} else {
			toast.error(message as string);
		}
		setIsLoading(false);
	}




	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});
	return (
		<div className="relative flex h-screen w-full items-center justify-center overflow-hidden px-6 md:px-8">
			<div
				className={cn(
					"relative flex w-full max-w-sm flex-col justify-between p-6 md:p-8",
					"dark:bg-[radial-gradient(50%_80%_at_20%_0%,--theme(--color-foreground/.1),transparent)]"
				)}
			>
				<div className="absolute -inset-y-6 -left-px w-px bg-border" />
				<div className="absolute -inset-y-6 -right-px w-px bg-border" />
				<div className="absolute -inset-x-6 -top-px h-px bg-border" />
				<div className="absolute -inset-x-6 -bottom-px h-px bg-border" />
				<DecorIcon position="top-left" />
				<DecorIcon position="bottom-right" />

				<div className="w-full max-w-sm animate-in space-y-8">
					<div className="space-y-4">
						{/* Optimized GIF with Next.js Image */}
						<div className="relative w-full overflow-hidden rounded-md">
							<AspectRatio ratio={16 / 9}>
								<Image
									src="/penguin.gif"
									alt="Penguin animation"
									fill
									className="object-cover grayscale"
									priority
									unoptimized={true}
									sizes="(max-width: 768px) 100vw, 384px"
								/>
							</AspectRatio>
						</div>

						<form
							id="form-rhf-demo"
							className="space-y-2"
							onSubmit={form.handleSubmit(onSubmit)}
						>
							<Controller
								name="email"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor={field.name}>Email</FieldLabel>
										<Input
											{...field}
											id={field.name}
											type="email"
											aria-invalid={fieldState.invalid}
											placeholder="m@example.com"
											autoComplete="off"
										/>
										{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
									</Field>
								)}
							/>

							<Controller
								name="password"
								control={form.control}
								render={({ field, fieldState }) => {
									const [showPassword, setShowPassword] = useState(false);

									return (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel htmlFor={field.name}>Password</FieldLabel>
											<InputGroup>
												<InputGroupInput
													{...field}
													id={field.name}
													type={showPassword ? "text" : "password"}
													placeholder="Enter password"
													aria-invalid={fieldState.invalid}
												/>
												<InputGroupAddon align="inline-end">
													<button
														type="button"
														onClick={() => setShowPassword((prev: any) => !prev)}
														className="focus:outline-none"
														aria-label={showPassword ? "Hide password" : "Show password"}
													>
														{showPassword ? (
															<EyeIcon className="h-4 w-4 mr-1" />
														) : (
															<EyeOffIcon className="h-4 w-4 mr-1" />
														)}
													</button>
												</InputGroupAddon>
											</InputGroup>
											{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
											<FieldDescription>
												Your password must be at least 8 characters
											</FieldDescription>
										</Field>
									);
								}}
							/>
							<Button className="w-full mt-3"
								disabled={isLoading} type="submit">
								{isLoading ? (
									<Loader2 className="size-4 animate-spin" />
								) : (
									"Continue With Email"
								)}
							</Button>


							<FieldDescription className="text-center">
								Don&apos;t have an account? <a href="/signup">Sign up</a>
							</FieldDescription>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}