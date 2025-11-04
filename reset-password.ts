import config from "@payload-config";
import { getPayload } from "payload";

/**
 * このスクリプトは、PayloadCMSのパスワードリセットトークンを生成します。
 * メール送信を無効にし、コンソールに直接リセットURLを出力します。
 *
 * 使い方:
 * 1. ADMIN_EMAILに対象の管理者メールアドレスを設定します。
 * 2. `pnpm payload run reset-password.ts` を実行します。
 */
const resetPassword = async () => {
	// --- ここにあなたの管理者メールアドレスを入力してください ---
	const ADMIN_EMAIL = "kouki.fukuda@gmail.com";
	// ----------------------------------------------------

	console.log("Payloadを初期化しています...");

	// getPayloadを使用してPayloadを初期化
	const payload = await getPayload({ config });

	console.log(
		`管理者 (${ADMIN_EMAIL}) のパスワードリセットトークンを生成しています...`,
	);

	try {
		const token = await payload.forgotPassword({
			collection: "users",
			data: {
				email: ADMIN_EMAIL,
			},
			disableEmail: true, // メール送信を無効化
		});

		const serverURL =
			process.env.PAYLOAD_PUBLIC_SERVER_URL || "http://localhost:3000";
		const resetURL = `${serverURL}/admin/reset/${token}`;

		console.log("---");
		console.log("成功！以下のURLを使用してパスワードを再設定してください。");
		console.log(resetURL);
		console.log("---");
		console.log("このURLは一度しか使用できません。");
	} catch (e) {
		if (e instanceof Error) {
			console.error("エラーが発生しました:", e.message);
			if (e.message.includes("not found")) {
				console.error(
					`指定されたメールアドレス (${ADMIN_EMAIL}) を持つユーザーが見つかりませんでした。メールアドレスが正しいか確認してください。`,
				);
			}
		} else {
			console.error("不明なエラー:", e);
		}
	}

	console.log("処理を終了します。");
	process.exit(0);
};

// スクリプトを実行
await resetPassword();
