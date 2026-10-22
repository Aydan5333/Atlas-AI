# Atlas daily workspace — 2026-10-21

This release candidate extends the local operational core with an actual daily planning loop. It is not a hosted phone service.

## Start on your Mac

Use Python 3.12+ and Node.js 22+. Check out this PR's branch, then run from the repository folder:

```bash
bash scripts/start_local.sh
```

On first launch this installs dependencies and creates private local credentials if no configuration exists. It preserves existing configuration. The launcher opens `http://127.0.0.1:3000/today`. Unlock with the access token stored in your local `.env`; never paste it into chat. Keep the launcher terminal open. Ctrl-C stops both services. These commands must run on your Mac; running them in a remote coding workspace does not install Atlas on your device.

## Morning → work → evening

1. Open Today. Its initial date follows the device's local calendar.
2. Add tasks, choose up to three priorities, enter appointments manually, and save the plan.
3. Read the briefing or press **Read briefing aloud**. It uses saved priorities, due tasks, overdue counts, blockers and manual commitments. It is generated from records, not a model response.
4. Complete or reopen priorities as work changes.
5. Write an evening review and save. Select an earlier date to revisit its plan/review; task status always reflects the current record, not a historical snapshot.
6. In Workspace, set task due dates, link contacts/projects, and export records, blueprints and saved days as JSON. Keep a protected copy of the SQLite database for recovery as described in LOCAL_CORE.md; JSON import/restore is not implemented.

Voice is initiated by a button and depends on the browser/device's speech engine. No background alarm, telephone call, push notification, microphone capture, or automatic wake-up is implemented. Use your existing device alarm to wake up and open Atlas. Real audio must be checked on the target Mac/iPhone. Do not rely on a browser tab to wake you.

## TSC blueprint → execution

Open **TSC Blueprint**, create a named business project, and fill in:

- offer and customer
- actual pricing/cost/capacity assumptions and results
- acquisition channel and conversion evidence
- proof of paid demand
- delivery process and responsible owner
- measurable expansion gate
- one next action

Save, then explicitly add the next action to tasks. It links to the project and avoids creating another identical open task. Choose it on Today. Stage selection does not certify progress. The framework recommends local proof → repeatable operations → second-city pilot → international demand validation; it does not assume revenue, sales or partners.

## Creator Bridge → conversations → paid work

Open **Creator Bridge** to plan a story for a specific audience, choose a TSC purpose and channels, write one call to action, and link an asset. Publish manually, then add live URLs and measured results, inquiries, paid projects, and revenue. Use its follow-up button to put response work on Today. The page does not discover people, post, message, read analytics, or process payments. See [Creator Bridge](CREATOR_BRIDGE.md) for the first TSC content experiment and the proof standard.

The first four-week experiment is in [TSC Content-to-Cash Sprint](TSC_CONTENT_TO_CASH_SPRINT.md). Its suggested first offer is a small paid artist-release visual package; treat it as a pilot until a real paid customer validates it. The doc includes an outreach structure, weekly proof loop and stop/revise criteria.

## Release boundary and next milestone

Local SQLite remains unencrypted. Keep sensitive family/legal/health/financial records outside this release. External calendar/email connections, AI conversation, private phone hosting, encrypted storage, and reliable wake-up delivery remain unimplemented.

Recommendation: validate one complete daily cycle and one Creator Bridge post on the owner's Mac; then run the four-week TSC content-to-cash experiment. Private phone access requires HTTPS, managed identity, durable storage, tested backups and device verification. No hosting/provider account or telephone-delivery credentials were provisioned in this change.
