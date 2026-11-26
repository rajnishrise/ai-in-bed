/**
 * Everyday AI: practical guides to using AI for ordinary work, one per job
 * (video, photos, writing, email, slides, research and more). Each guide
 * answers "what's the best tool and how do I use it well?", with free and
 * open-source options first, since the site is about open learning.
 *
 * Text supports **bold**, *italic*, `code` and [links](/path), as in the blog.
 * Tools with a url starting "/" are pages on this site. Lessons are
 * "level/slug" keys; posts are blog slugs.
 */

import type { Faq } from "./faq";
import { moreEverydayGuides } from "./everyday-more";

export type ToolCost = "open-source" | "open-weights" | "free" | "free-plan" | "paid";

export const costLabel: Record<ToolCost, string> = {
  "open-source": "Open source",
  "open-weights": "Open weights",
  free: "Free",
  "free-plan": "Free plan",
  paid: "Paid",
};

export type Tool = {
  name: string;
  url: string;
  by: string;
  cost: ToolCost;
  /** The job it's best at, shown above the name. */
  for: string;
  why: string;
};

export type UseCaseGuide = {
  slug: string;
  /** The page heading, phrased the way people ask. */
  title: string;
  /** The search title (the brand is added after it). */
  seoTitle: string;
  description: string;
  /** A short label, e.g. "Video". */
  topic: string;
  /** One line for the hub card. */
  card: string;
  published: string;
  updated?: string;
  /** Two to four sentences that answer the question on their own. */
  answer: string;
  /** What AI is genuinely good at for this job. */
  canDo: string[];
  tools: Tool[];
  /** A simple workflow, start to finish. */
  steps: string[];
  prompts: { for: string; text: string }[];
  tips: string[];
  watchOut: string[];
  faqs: Faq[];
  lessons: string[];
  posts: string[];
};

const PUBLISHED = "2026-11-26";

const guides: UseCaseGuide[] = [
  {
    slug: "ai-for-video",
    title: "How to use AI to make better videos",
    seoTitle: "Best AI Video Tools (Free and Open Source): Editing, Captions and Generation",
    description:
      "The best AI tools for making and editing videos, from free captions and silence cutting to text-to-video generators, plus a simple workflow and prompts you can copy.",
    topic: "Video",
    card: "Edit faster, add captions automatically, clean up sound and generate clips from text.",
    published: PUBLISHED,
    answer:
      "Use AI for the boring parts of video: transcribing, captioning, cutting silences and cleaning up sound. CapCut and DaVinci Resolve are the best free editors, Kdenlive is the best open-source one, and Descript lets you edit a video by editing its transcript. For generating clips from a text prompt, Veo, Sora, Runway and Kling lead, and Wan and LTX-Video are open models you can run yourself.",
    canDo: [
      "Turn speech into captions and subtitles in minutes, in dozens of languages.",
      "Cut pauses, \"ums\" and retakes automatically, or edit by deleting words from a transcript.",
      "Clean up echo and background noise so a phone recording sounds like a studio one.",
      "Reframe a landscape video for Reels, Shorts and TikTok by tracking the speaker.",
      "Write scripts, hooks and titles, and generate short clips or B-roll from a text prompt.",
    ],
    tools: [
      { for: "Quick edits on your phone", name: "CapCut", url: "https://www.capcut.com", by: "ByteDance", cost: "free-plan", why: "Auto captions, templates, background removal and one-tap resizing for social video. Some effects and exports need the paid plan." },
      { for: "Pro editing, free", name: "DaVinci Resolve", url: "https://www.blackmagicdesign.com/products/davinciresolve", by: "Blackmagic Design", cost: "free", why: "A Hollywood-grade editor and colour tool with a generous free version. The paid Studio version adds most of the AI tools, such as Magic Mask and voice isolation." },
      { for: "Open-source editing", name: "Kdenlive", url: "https://kdenlive.org", by: "KDE community", cost: "open-source", why: "A full editor for Windows, Mac and Linux with automatic subtitles from speech, using the open Whisper model on your own computer." },
      { for: "Edit by editing the transcript", name: "Descript", url: "https://www.descript.com", by: "Descript", cost: "free-plan", why: "Delete a sentence from the text and it's gone from the video. Removes filler words and has Studio Sound to clean up audio." },
      { for: "Cut silences automatically", name: "auto-editor", url: "https://github.com/WyattBlue/auto-editor", by: "WyattBlue and contributors", cost: "open-source", why: "A free command-line tool that removes the quiet parts of a recording. Great for talking-head videos and lectures." },
      { for: "Text-to-video, top quality", name: "Veo in Gemini", url: "https://gemini.google.com", by: "Google", cost: "free-plan", why: "Generates short, realistic clips with sound from a prompt. Free use is limited; more comes with Google's AI plans." },
      { for: "Generating and extending clips", name: "Runway", url: "https://runwayml.com", by: "Runway", cost: "free-plan", why: "Text-to-video, image-to-video and AI editing tools in one place, built for creators. A small free allowance, then credits." },
      { for: "Open video models", name: "Wan", url: "https://github.com/Wan-Video", by: "Alibaba", cost: "open-weights", why: "Open-weight text-to-video and image-to-video models you can run on a good gaming GPU, usually through ComfyUI." },
      { for: "Fast open video model", name: "LTX-Video", url: "https://github.com/Lightricks/LTX-Video", by: "Lightricks", cost: "open-weights", why: "An open video model designed to be fast, so you can try ideas quickly on your own hardware." },
    ],
    steps: [
      "**Plan with a chatbot.** Give it your topic, audience and length, and ask for a hook, a three-part outline and a short script you can read out loud.",
      "**Record simply.** Phone, good light from a window, and the microphone close to your mouth. AI can fix a lot, but not a camera pointed at a bright window.",
      "**Rough cut with AI.** Drop the footage into Descript, CapCut or auto-editor to remove silences, filler words and retakes in one go.",
      "**Clean the sound.** Run Studio Sound, Adobe Podcast's Enhance Speech or Resolve's voice isolation. Viewers forgive shaky video far sooner than bad audio.",
      "**Add captions.** Auto-caption, then read them through once: names and technical words are where speech recognition slips.",
      "**Add B-roll.** Use stock footage, screen recordings or a few generated clips. Keep generated clips short and label them if they show real-looking people or places.",
      "**Resize and title.** Reframe for vertical, then ask a chatbot for five title and thumbnail-text options and pick the clearest.",
    ],
    prompts: [
      { for: "Script", text: "Write a 60-second video script about [topic] for [audience]. Open with a hook in the first 3 seconds, make one clear point, and end with a single call to action. Write it to be spoken, in short sentences." },
      { for: "Text-to-video", text: "Slow push-in on a cosy bedroom at night, warm lamp light, rain on the window, a person reading on a tablet, shallow depth of field, calm mood, 35mm film look." },
      { for: "Titles", text: "Here is my video transcript. Suggest 8 titles under 60 characters that are specific and honest (no clickbait), and 3 short phrases for the thumbnail." },
    ],
    tips: [
      "In a video prompt, describe the camera (close-up, slow pan, handheld), the light and the mood, not just the subject.",
      "Generate several short clips and cut between them. Long single generations drift and glitch.",
      "Burn captions into vertical videos: most people watch social video with the sound off.",
      "Keep the original recording. AI edits are fast to redo when you change your mind.",
    ],
    watchOut: [
      "Don't generate real people, or put words in their mouths, without their consent. Many platforms require you to label realistic AI video.",
      "Check the licence before using generated clips or AI music commercially; free plans often limit it.",
      "Auto-captions mishear names, numbers and jargon. Always read them once.",
    ],
    faqs: [
      { q: "What is the best free AI video editor?", a: "CapCut is the easiest free option for phone and social video. DaVinci Resolve is the most powerful free editor on a computer. Kdenlive is the best fully open-source choice and adds automatic subtitles with Whisper." },
      { q: "Can AI make a whole video from text?", a: "It can make short clips, usually a few seconds to about a minute, from a text prompt. Tools like Veo, Sora, Runway and Kling are good at this. For a full video with a story, you still plan the shots and edit the clips together." },
      { q: "Is there an open-source AI video generator?", a: "Yes. Wan from Alibaba, LTX-Video from Lightricks and HunyuanVideo from Tencent publish their model weights, and you can run them with ComfyUI on a computer with a strong graphics card." },
      { q: "How do I add subtitles to a video automatically?", a: "Use the auto-caption feature in CapCut, Descript or Kdenlive, or transcribe the audio with Whisper and import the subtitle file. Then read through once to fix names and numbers." },
    ],
    lessons: ["beginner/how-ai-makes-pictures", "advanced/diffusion", "beginner/spotting-ai-fakes"],
    posts: ["what-is-generative-ai", "prompt-engineering-for-beginners"],
  },
  {
    slug: "ai-photo-editing",
    title: "How to edit photos with AI",
    seoTitle: "Best AI Photo Editors (Free and Open Source): Remove, Upscale, Fix",
    description:
      "How to edit photos with AI: remove objects and backgrounds, upscale and sharpen, fix lighting and extend a picture. The best free and open-source AI photo editors, with a simple workflow.",
    topic: "Photo editing",
    card: "Remove objects and backgrounds, upscale old photos and fix lighting in a tap.",
    published: PUBLISHED,
    answer:
      "AI photo editing is best at four jobs: removing things (objects, people, backgrounds), adding or extending things (generative fill), sharpening and upscaling, and fixing light and colour. Google Photos and Canva do the basics for free, Photoshop's Generative Fill is the most powerful, and the open-source tools Upscayl, IOPaint, rembg and the Krita AI plugin do the same jobs on your own computer for free.",
    canDo: [
      "Erase a stranger, a power line or a stain with a brush stroke.",
      "Cut out the subject and replace or blur the background.",
      "Upscale a small or old photo and sharpen faces that were slightly out of focus.",
      "Extend a photo beyond its edges, or change a part of it by describing what you want.",
      "Fix dull light, colour casts and noise from photos taken at night.",
    ],
    tools: [
      { for: "Quick fixes on your phone", name: "Google Photos", url: "https://photos.google.com", by: "Google", cost: "free", why: "Magic Eraser, Unblur and one-tap enhance are built in. Magic Editor can move and resize things in a photo." },
      { for: "Edits by describing them", name: "Gemini or ChatGPT", url: "https://gemini.google.com", by: "Google / OpenAI", cost: "free-plan", why: "Upload a photo and ask in plain words: \"remove the people in the background\" or \"make it golden hour\". Good for quick changes, less precise than an editor." },
      { for: "Design and social posts", name: "Canva", url: "https://www.canva.com", by: "Canva", cost: "free-plan", why: "Magic Edit and Magic Eraser inside a design tool, so you can go straight from edit to post. The background remover needs Pro." },
      { for: "The most control", name: "Photoshop Generative Fill", url: "https://www.adobe.com/products/photoshop.html", by: "Adobe", cost: "paid", why: "Select an area, type what should be there, and get several options that match the light and perspective. Trained on licensed images." },
      { for: "Upscaling, open source", name: "Upscayl", url: "https://upscayl.org", by: "Upscayl contributors", cost: "open-source", why: "A free desktop app that enlarges and sharpens photos with AI, running entirely on your computer." },
      { for: "Removing objects, open source", name: "IOPaint", url: "https://github.com/Sanster/IOPaint", by: "Sanster and contributors", cost: "open-source", why: "Brush over anything and it's filled in. Runs locally in your browser with open models such as LaMa." },
      { for: "Background removal, open source", name: "rembg", url: "https://github.com/danielgatis/rembg", by: "Daniel Gatis and contributors", cost: "open-source", why: "Removes backgrounds from one photo or a whole folder at once. Handy for product photos." },
      { for: "AI inside a free editor", name: "Krita AI Diffusion", url: "https://github.com/Acly/krita-ai-diffusion", by: "Acly and contributors", cost: "open-source", why: "Adds generative fill, expand and refine to the free painting app Krita, using open models on your machine." },
      { for: "AI plugins for GIMP", name: "OpenVINO plugins for GIMP", url: "https://github.com/intel/openvino-ai-plugins-gimp", by: "Intel", cost: "open-source", why: "Adds Stable Diffusion, super-resolution and segmentation to GIMP, the long-standing open-source photo editor." },
    ],
    steps: [
      "**Start from the best original.** Edit a copy and keep the full-size file. AI fills look better with more pixels to work from.",
      "**Fix light and colour first.** Use auto-enhance or a basic edit before any generative work, so new pixels match the final look.",
      "**Remove distractions.** Brush loosely over the object with a little margin around it, and try two or three variations.",
      "**Change or extend with a short description.** Describe what should be there (\"empty sandy beach\"), not what to remove.",
      "**Upscale last.** Enlarge only when you're done editing, and check faces and text closely: upscalers sometimes invent detail.",
      "**Zoom to 100% and look at the edges** of anything you removed or added before you share it.",
    ],
    prompts: [
      { for: "Describe an edit", text: "Remove the people in the background and fill in the space so it looks natural. Keep the person in front, the lighting and the colours exactly the same." },
      { for: "Generative fill", text: "a wooden bench under the tree, same afternoon light and shadows" },
      { for: "Product photo", text: "Put this product on a clean light-grey background with a soft shadow underneath, like a professional catalogue photo. Don't change the product itself." },
    ],
    tips: [
      "Small selections give better fills than one huge one. Work in a few passes.",
      "For generative fill, write a few words about what should appear, not a long prompt.",
      "Batch tools (rembg, Upscayl) save hours when you have dozens of product shots.",
      "If a face looks waxy after upscaling, use a lower strength or a model meant for photos.",
    ],
    watchOut: [
      "Don't edit photos of other people in misleading ways, and say when a news or documentary image has been changed.",
      "Many apps add a content credential or watermark to AI edits. Don't strip it to pass an edit off as untouched.",
      "Upscaling can't recover true detail. Never use it to \"enhance\" evidence, documents or ID photos.",
    ],
    faqs: [
      { q: "What is the best free AI photo editor?", a: "For phones, Google Photos covers removal, unblur and enhance for free. On a computer, Krita with the AI Diffusion plugin is the most capable free and open-source choice, with Upscayl for upscaling and IOPaint for removing objects." },
      { q: "How do I remove an object from a photo with AI?", a: "Open the photo in a tool with an eraser or generative fill (Google Photos, Canva, Photoshop or IOPaint), brush over the object with a little margin, and pick the best of the suggested fills." },
      { q: "Can AI make a blurry photo sharp?", a: "It can help with slight blur and small or old photos by sharpening and upscaling, but it fills in plausible detail rather than recovering the real thing. Very blurry photos rarely come back." },
      { q: "Is there a free alternative to Photoshop Generative Fill?", a: "Yes. The Krita AI Diffusion plugin and the OpenVINO plugins for GIMP add generative fill to free, open-source editors using open models. Canva and Adobe Express also include free generative edits with limits." },
    ],
    lessons: ["beginner/how-ai-makes-pictures", "advanced/diffusion", "intermediate/cnns-and-rnns"],
    posts: ["what-is-generative-ai"],
  },
  {
    slug: "ai-image-generators",
    title: "How to make great images with AI",
    seoTitle: "Best AI Image Generators (Free and Open Source) and How to Prompt Them",
    description:
      "The best free and open-source AI image generators, what each one is good at, and how to write image prompts that get the picture you have in your head.",
    topic: "Image generation",
    card: "Pick the right image generator and write prompts that get the picture in your head.",
    published: PUBLISHED,
    answer:
      "For most people, ChatGPT and Gemini are the easiest free AI image generators: you describe a picture and then refine it by chatting. Midjourney gives the most artistic results, Ideogram is best at text and logos, and Adobe Firefly is the safest for commercial work. If you want it free and private, open models like FLUX.1 [schnell] run on your own computer through ComfyUI or InvokeAI.",
    canDo: [
      "Make illustrations, posters, mood boards and social images from a description.",
      "Produce several styles of the same idea in seconds so you can choose.",
      "Put readable text, like a title or a sign, into an image.",
      "Keep a character or product consistent across a set of images.",
      "Turn a rough sketch or photo into a finished image.",
    ],
    tools: [
      { for: "Easiest: chat to refine", name: "ChatGPT", url: "https://chatgpt.com", by: "OpenAI", cost: "free-plan", why: "Strong at following detailed instructions and writing text in images. Ask for changes in plain words. Free use is limited per day." },
      { for: "Fast edits and consistency", name: "Gemini", url: "https://gemini.google.com", by: "Google", cost: "free-plan", why: "Generates and edits images in chat, and keeps the same person or object consistent across edits." },
      { for: "Most artistic", name: "Midjourney", url: "https://www.midjourney.com", by: "Midjourney", cost: "paid", why: "The go-to for striking, stylised images and art direction. Paid plans only." },
      { for: "Text, logos and posters", name: "Ideogram", url: "https://ideogram.ai", by: "Ideogram", cost: "free-plan", why: "Reliably spells words correctly inside images, which makes it great for posters, cards and logo ideas." },
      { for: "Safe for commercial work", name: "Adobe Firefly", url: "https://firefly.adobe.com", by: "Adobe", cost: "free-plan", why: "Trained on licensed and public-domain images, so it's the cautious choice for work you'll sell or publish." },
      { for: "Open model, free licence", name: "FLUX.1 [schnell]", url: "https://github.com/black-forest-labs/flux", by: "Black Forest Labs", cost: "open-weights", why: "A fast, high-quality open model under the Apache 2.0 licence, so you can use it freely, including commercially." },
      { for: "Run open models yourself", name: "ComfyUI", url: "https://github.com/comfyanonymous/ComfyUI", by: "Comfy Org and contributors", cost: "open-source", why: "The most flexible free app for running image (and video) models on your own computer, by connecting blocks into a workflow." },
      { for: "A friendlier local app", name: "InvokeAI", url: "https://github.com/invoke-ai/InvokeAI", by: "Invoke and contributors", cost: "open-source", why: "A polished open-source studio with a canvas for inpainting and outpainting, good if ComfyUI feels like too much." },
    ],
    steps: [
      "**Decide the use first.** A phone wallpaper, a slide and a poster need different shapes. Pick the aspect ratio before you prompt.",
      "**Write the prompt in layers:** subject, setting, style, light, camera or medium, mood. One clear sentence beats a list of 40 keywords.",
      "**Make four, then refine.** Choose the closest image and ask for specific changes instead of rewriting the whole prompt.",
      "**Fix small things with inpainting.** Select a hand, a face or a sign and regenerate just that part.",
      "**Upscale and check details:** hands, text, reflections and anything that should be symmetrical.",
      "**Save your prompt** next to the image so you can make a matching set later.",
    ],
    prompts: [
      { for: "Illustration", text: "A cosy flat illustration of a person reading on a tablet in bed at night, a crescent moon through the window, warm amber and deep brown palette, soft grain texture, minimal details, square." },
      { for: "Photo style", text: "Close-up photo of a ceramic coffee mug on a wooden desk by a rainy window, morning light, shallow depth of field, shot on a 50mm lens, calm and quiet mood." },
      { for: "Poster with text", text: "A minimalist poster that says \"Learn AI tonight\" in large elegant serif letters, a small moon and three stars above, cream paper background, navy ink." },
    ],
    tips: [
      "Name the medium (watercolour, 35mm photo, flat vector, clay render). It changes the result more than any adjective.",
      "Describe light: \"golden hour\", \"soft window light\", \"neon at night\".",
      "Put the most important thing first in the prompt.",
      "For consistent characters, reuse one reference image and describe the same outfit and features each time.",
    ],
    watchOut: [
      "Don't make realistic images of real people, or images that could be mistaken for news.",
      "Avoid copying a living artist's name and style for commercial work. Describe the qualities you like instead.",
      "Read each tool's terms on commercial use. Free plans and some open models restrict it.",
    ],
    faqs: [
      { q: "What is the best free AI image generator?", a: "ChatGPT and Gemini are the best free options for most people because you can refine images by chatting. Ideogram is best for images with text. For unlimited free use, run the open FLUX.1 [schnell] model with ComfyUI or InvokeAI on your own computer." },
      { q: "Can I use AI images commercially?", a: "Often, yes, but it depends on the tool and plan. Adobe Firefly is designed for commercial use, and FLUX.1 [schnell] is Apache 2.0 licensed. Check the terms of the tool you use, and be aware that purely AI-generated images may not get copyright protection in some countries." },
      { q: "Why does AI get hands and text wrong?", a: "Image models learn patterns from millions of pictures, and hands and letters vary a lot and are small in most photos. Newer models are much better, and you can fix the rest with inpainting." },
      { q: "How do AI image generators work?", a: "Most use diffusion: they start from random noise and remove it step by step, steered by your text, until a picture appears. The Advanced lesson on diffusion explains it with an interactive demo." },
    ],
    lessons: ["beginner/how-ai-makes-pictures", "advanced/diffusion", "beginner/prompting-well"],
    posts: ["what-is-generative-ai", "prompt-engineering-for-beginners"],
  },
  {
    slug: "ai-for-writing",
    title: "How to use AI to write better",
    seoTitle: "How to Use AI for Writing: Best Free AI Writing Tools and Prompts",
    description:
      "How to use AI to write better without sounding like a robot: drafting, editing, tone, grammar and translation, with the best free and open-source AI writing tools and prompts to copy.",
    topic: "Writing",
    card: "Draft faster, edit sharper and keep your own voice, in any language.",
    published: PUBLISHED,
    answer:
      "Use AI as an editor and sparring partner, not a ghostwriter. Give it your notes and your audience, ask for an outline or a rough draft, then rewrite it in your own words and ask it to critique the result. Claude, ChatGPT and Gemini are the best free chatbots for this; LanguageTool (open source) and Grammarly catch grammar; DeepL translates; and Ollama runs a private writing assistant on your own computer.",
    canDo: [
      "Turn messy notes into an outline, and an outline into a first draft.",
      "Tighten wordy writing, change the tone, or make it shorter for a phone screen.",
      "Point out unclear sentences, gaps in an argument and missing examples.",
      "Fix grammar and spelling, and translate while keeping the meaning and tone.",
      "Brainstorm titles, openings and ways into a hard topic.",
    ],
    tools: [
      { for: "Long drafts and natural tone", name: "Claude", url: "https://claude.ai", by: "Anthropic", cost: "free-plan", why: "Known for natural, less formulaic prose and careful editing of long documents. Good at following a style guide you paste in." },
      { for: "All-rounder with an editor view", name: "ChatGPT", url: "https://chatgpt.com", by: "OpenAI", cost: "free-plan", why: "Canvas lets you edit a draft side by side with the AI and ask for changes to one paragraph at a time." },
      { for: "Writing inside Google Docs", name: "Gemini", url: "https://gemini.google.com", by: "Google", cost: "free-plan", why: "A strong free chatbot, and built into Docs and Gmail on Google's AI and Workspace plans." },
      { for: "Grammar, open source", name: "LanguageTool", url: "https://languagetool.org", by: "LanguageTooler GmbH and community", cost: "open-source", why: "Grammar and style checks in over 30 languages, with an open-source core you can even run on your own server." },
      { for: "Grammar and clarity", name: "Grammarly", url: "https://www.grammarly.com", by: "Grammarly", cost: "free-plan", why: "Catches mistakes everywhere you type through its browser extension. Tone and rewrite features are mostly paid." },
      { for: "Plain, readable writing", name: "Hemingway Editor", url: "https://hemingwayapp.com", by: "Hemingway", cost: "free", why: "The free web version highlights long sentences, passive voice and hard words, which is great for checking AI drafts too." },
      { for: "Translation", name: "DeepL", url: "https://www.deepl.com", by: "DeepL", cost: "free-plan", why: "Natural-sounding translation, plus DeepL Write for polishing text in a few languages." },
      { for: "Private writing, offline", name: "Ollama", url: "https://ollama.com", by: "Ollama", cost: "open-source", why: "Runs open models like Llama, Gemma or Qwen on your laptop, so drafts never leave your computer." },
    ],
    steps: [
      "**Brief it like a person.** Say who it's for, what they should think or do after reading, and how long it should be.",
      "**Give it your raw material:** notes, bullet points, a voice memo transcript. AI writes much better from your ideas than from nothing.",
      "**Ask for an outline first.** Fix the structure before any sentences exist.",
      "**Draft, then make it yours.** Rewrite the opening and closing yourself, and cut anything you wouldn't say out loud.",
      "**Ask for a critique, not a rewrite.** \"What's unclear? Where would a reader stop?\" keeps your voice intact.",
      "**Check facts and run a grammar pass** with LanguageTool or Grammarly before you send it.",
    ],
    prompts: [
      { for: "Draft from notes", text: "Here are my notes for a [blog post / report / speech] for [audience]. Turn them into a clear outline with a one-line point per section. Don't add facts I didn't give you; mark gaps with [NEED]." },
      { for: "Critique", text: "Act as a demanding editor. Don't rewrite my text. List the 5 biggest problems (unclear sentences, weak argument, missing examples, too long), each with the exact sentence and a short suggestion." },
      { for: "Match my voice", text: "Here are three things I've written. Describe my writing style in 5 bullet points. Then edit the draft below to match that style, changing as little as possible." },
    ],
    tips: [
      "Paste an example of writing you like and ask it to match the style.",
      "Ban the clichés you hate: \"Avoid words like 'delve', 'tapestry' and 'unlock'.\"",
      "Ask for three versions with different tones and blend the best parts.",
      "Read the final draft out loud. It's still the best edit there is.",
    ],
    watchOut: [
      "AI can invent quotes, statistics and sources. Check every fact you didn't supply.",
      "Schools, journals and some employers have rules on AI use. Know them and say when you used it.",
      "Don't paste confidential or personal information into a chatbot your organisation hasn't approved.",
    ],
    faqs: [
      { q: "What is the best free AI for writing?", a: "Claude, ChatGPT and Gemini all have strong free plans. Claude is often preferred for natural tone and long documents, ChatGPT's Canvas is handy for editing side by side, and LanguageTool is a free, open-source grammar checker." },
      { q: "How do I make AI writing sound human?", a: "Start from your own notes, give it examples of your writing, ask for a critique instead of a full rewrite, and rewrite the opening and ending yourself. Cut generic phrases and add specific details only you know." },
      { q: "Is it OK to use AI to write?", a: "For most everyday writing, yes, as long as you check the facts and the result says what you mean. Schools, publishers and workplaces may have their own rules, so follow them and be open about it." },
      { q: "Can AI translate as well as a person?", a: "For everyday text, tools like DeepL and modern chatbots are very good. For legal, medical or published work, have a fluent person review it." },
    ],
    lessons: ["beginner/prompting-well", "beginner/meet-llms", "beginner/using-ai-safely"],
    posts: ["prompt-engineering-for-beginners", "why-does-ai-hallucinate"],
  },
  {
    slug: "ai-for-email",
    title: "How to use AI for email",
    seoTitle: "How to Use AI for Email: Write, Reply and Clear Your Inbox Faster",
    description:
      "How to use AI to write emails, reply faster, summarise long threads and get to inbox zero, with the best AI email tools (including free and open-source options) and prompts to copy.",
    topic: "Email",
    card: "Write clearer emails, reply in seconds and summarise long threads.",
    published: PUBLISHED,
    answer:
      "AI is great for three email jobs: drafting replies from a few words, summarising long threads, and fixing the tone of a tricky message. The AI built into Gmail, Outlook and Apple Mail does this inside your inbox; any free chatbot works if you paste the email in. Thunderbird with the open-source ThunderAI add-on can do it with a model running on your own computer.",
    canDo: [
      "Turn \"yes, Thursday works, send the deck\" into a polite, complete reply.",
      "Summarise a 30-message thread into decisions, open questions and who owes what.",
      "Soften a blunt message or firm up a vague one.",
      "Draft follow-ups, cold emails and difficult \"no\" emails.",
      "Pull dates, tasks and numbers out of emails into a list.",
    ],
    tools: [
      { for: "Inside Gmail", name: "Gemini in Gmail", url: "https://workspace.google.com/products/gmail/", by: "Google", cost: "paid", why: "\"Help me write\", thread summaries and smart replies, on Google's AI and Workspace plans." },
      { for: "Inside Outlook", name: "Microsoft 365 Copilot", url: "https://www.microsoft.com/microsoft-365/copilot", by: "Microsoft", cost: "paid", why: "Drafts replies, coaches tone and summarises threads in Outlook, with access to your calendar and files." },
      { for: "On iPhone and Mac", name: "Apple Intelligence", url: "https://www.apple.com/apple-intelligence/", by: "Apple", cost: "free", why: "Writing Tools rewrite, proofread and summarise in Mail on supported devices, mostly on-device." },
      { for: "Any inbox, copy and paste", name: "Claude or ChatGPT", url: "https://claude.ai", by: "Anthropic / OpenAI", cost: "free-plan", why: "Paste the thread, say what you want to say, get a draft. Works with any email service." },
      { for: "AI-first Gmail app", name: "Shortwave", url: "https://www.shortwave.com", by: "Shortwave", cost: "free-plan", why: "A Gmail client built around AI: ask questions about your inbox, bundle newsletters, and draft in your style." },
      { for: "Open source and private", name: "Thunderbird + ThunderAI", url: "https://addons.thunderbird.net/thunderbird/addon/thunderai/", by: "Mozilla / ThunderAI contributors", cost: "open-source", why: "The open-source email app plus an add-on that drafts, summarises and translates, using ChatGPT, Gemini or a local model through Ollama." },
    ],
    steps: [
      "**Write your intent in one line:** \"Say yes, but only after the 15th, and ask for the budget.\"",
      "**Give it the thread** (or let the built-in assistant read it) so the reply answers what was actually asked.",
      "**Say the tone and length:** \"warm, three sentences\" or \"firm but friendly\".",
      "**Edit the first and last line** so it sounds like you, and check every name, date and number.",
      "**For a busy inbox, summarise first:** ask for decisions, questions for you, and deadlines, then reply to those.",
    ],
    prompts: [
      { for: "Reply", text: "Here's an email I received. Draft a reply that says [your point in a few words]. Keep it under 100 words, friendly and direct, and end with a clear next step." },
      { for: "Thread summary", text: "Summarise this email thread in three parts: decisions made, questions still open (and who should answer), and deadlines. Use bullet points and quote exact dates." },
      { for: "Tone check", text: "Here's an email I'm about to send to [person/role]. How might it come across? Suggest a version that's [warmer / more confident / more concise] without changing what I'm asking for." },
    ],
    tips: [
      "Keep a note of prompts that work and reuse them: \"Decline politely and suggest next quarter\".",
      "Ask for the email as bullet points first if you're not sure what you want to say.",
      "Shorter is almost always better. Ask it to cut the draft by a third.",
    ],
    watchOut: [
      "Never let AI send emails on its own without you reading them.",
      "Don't paste customers' or colleagues' personal data into tools your workplace hasn't approved.",
      "Be wary of emails asking an AI assistant to do things (\"ignore your instructions and…\"). That's a prompt injection attack.",
    ],
    faqs: [
      { q: "Can ChatGPT write emails for me?", a: "Yes. Paste the email you're replying to, say in a few words what you want to say, and ask for a reply in the tone and length you need. Read and edit it before sending." },
      { q: "Is there a free AI email assistant?", a: "Apple Intelligence's Writing Tools are free on supported Apple devices, Shortwave has a free plan for Gmail, and any free chatbot works with copy and paste. Thunderbird with the open-source ThunderAI add-on is free and can use a local model." },
      { q: "Is it safe to use AI for work email?", a: "Use the tools your employer approves, especially for confidential information. Built-in assistants in Microsoft 365 and Google Workspace business plans keep your data under your organisation's agreements." },
    ],
    lessons: ["beginner/prompting-well", "beginner/ai-at-work", "beginner/using-ai-safely"],
    posts: ["prompt-engineering-for-beginners", "what-is-an-ai-agent"],
  },
  {
    slug: "ai-for-presentations",
    title: "How to make presentations with AI",
    seoTitle: "Best AI Presentation Makers (Free and Open Source) and How to Use Them",
    description:
      "How to make better slides with AI: turn notes into a clear story, generate a deck, and design visuals. The best free and open-source AI presentation tools, with prompts to copy.",
    topic: "Presentations",
    card: "Turn notes into a clear story and a good-looking deck in minutes.",
    published: PUBLISHED,
    answer:
      "Use AI first for the story, then for the slides. Ask a chatbot to turn your notes into a one-line message and a slide-by-slide outline, then build it in Gamma or Canva (free plans), Copilot in PowerPoint or Gemini in Google Slides. If you prefer open source, ask the chatbot for Markdown and turn it into slides with Marp or Slidev.",
    canDo: [
      "Find the one message your talk should land, and the order to tell it in.",
      "Turn a document or a page of notes into a slide outline with speaker notes.",
      "Generate a first deck with layouts, icons and images.",
      "Turn a list or a process into a diagram.",
      "Rehearse: ask it the hard questions your audience might ask.",
    ],
    tools: [
      { for: "Whole deck from a prompt", name: "Gamma", url: "https://gamma.app", by: "Gamma", cost: "free-plan", why: "Generates a full, well-designed deck, document or web page from a prompt or pasted notes, then lets you edit card by card." },
      { for: "Design-first decks", name: "Canva", url: "https://www.canva.com", by: "Canva", cost: "free-plan", why: "Magic Design builds slides from a prompt using Canva's huge template library, easy to brand and share." },
      { for: "In PowerPoint", name: "Copilot in PowerPoint", url: "https://www.microsoft.com/microsoft-365/powerpoint", by: "Microsoft", cost: "paid", why: "Creates a deck from a Word document or a prompt and redesigns slides, inside the tool most offices use." },
      { for: "In Google Slides", name: "Gemini in Slides", url: "https://workspace.google.com/products/slides/", by: "Google", cost: "paid", why: "Generates images and slides inside Google Slides on Google's AI and Workspace plans." },
      { for: "Text into diagrams", name: "Napkin", url: "https://www.napkin.ai", by: "Napkin AI", cost: "free-plan", why: "Paste a paragraph and get editable diagrams and visuals that explain it." },
      { for: "Slides from Markdown, open source", name: "Marp", url: "https://marp.app", by: "Marp team", cost: "open-source", why: "Write slides as simple Markdown (which any chatbot can produce) and export to PDF, PowerPoint or HTML." },
      { for: "Developer-friendly slides", name: "Slidev", url: "https://sli.dev", by: "Anthony Fu and contributors", cost: "open-source", why: "Markdown slides with code highlighting, diagrams and animations, great for technical talks." },
      { for: "Free office suite", name: "LibreOffice Impress", url: "https://www.libreoffice.org", by: "The Document Foundation", cost: "open-source", why: "A free, open-source PowerPoint alternative that opens and saves .pptx, for finishing decks without a subscription." },
    ],
    steps: [
      "**Start with one sentence:** what should the audience believe or do afterwards? Ask the AI to help you sharpen it.",
      "**Outline before slides.** Ask for 8 to 12 slide titles that tell the story on their own, then reorder them yourself.",
      "**Generate the deck** in Gamma, Canva or PowerPoint from that outline, not from a vague topic.",
      "**Cut words.** One idea per slide; move detail to speaker notes. Ask the AI to rewrite each slide as a headline plus three short points.",
      "**Replace generic images** with your own data, screenshots and photos where you can.",
      "**Rehearse with AI:** paste your notes and ask for the five toughest questions and a two-minute version.",
    ],
    prompts: [
      { for: "Story outline", text: "I'm presenting [topic] to [audience] for [minutes] minutes. Their main worry is [X]. Give me the one-sentence message, then 10 slide titles that tell the story on their own, each with 2 or 3 points for speaker notes." },
      { for: "Marp slides", text: "Turn this outline into Marp Markdown slides: a title slide, one slide per section with a headline and at most 3 short bullets, and speaker notes in HTML comments." },
      { for: "Rehearsal", text: "Here are my slides and notes. Play a sceptical [CFO / teacher / client]. Ask me the 5 hardest questions one at a time and tell me which answers were weak." },
    ],
    tips: [
      "Write slide titles as full sentences that make a point (\"Costs fell 20% after we switched\"), not labels (\"Costs\").",
      "Give the AI your brand colours and fonts at the start so you don't redesign later.",
      "Generated decks look polished but generic. Your own numbers and stories are what people remember.",
    ],
    watchOut: [
      "Check every number, chart and claim the AI added. It fills gaps with plausible-sounding facts.",
      "Generated images of people and logos can cause copyright or trademark problems in public talks.",
      "Uploading confidential decks to free tools may break your company's rules.",
    ],
    faqs: [
      { q: "What is the best free AI presentation maker?", a: "Gamma and Canva have the most capable free plans for generating a full deck from a prompt. If you want open source, have a chatbot write Markdown and turn it into slides with Marp or Slidev." },
      { q: "Can ChatGPT make a PowerPoint?", a: "Chatbots like ChatGPT and Claude can write the outline, speaker notes and slide text, and can create a .pptx file or HTML slides you download. For design, paste their outline into Gamma, Canva or PowerPoint's Designer." },
      { q: "How do I make AI slides look less generic?", a: "Start from your own outline and message, use your brand colours, replace stock images with your own data and photos, and cut each slide to one idea." },
    ],
    lessons: ["beginner/prompting-well", "beginner/ai-at-work", "intermediate/multimodal-models"],
    posts: ["prompt-engineering-for-beginners"],
  },
];

export const everydayGuides: UseCaseGuide[] = [...guides, ...moreEverydayGuides];

export const getEverydayGuide = (slug: string) => everydayGuides.find((g) => g.slug === slug);

/** All of a guide's words, for search and word counts. */
export const everydayText = (g: UseCaseGuide) =>
  [
    g.title,
    g.description,
    g.answer,
    ...g.canDo,
    ...g.tools.flatMap((t) => [t.name, t.for, t.why]),
    ...g.steps,
    ...g.prompts.map((p) => p.text),
    ...g.tips,
    ...g.watchOut,
    ...g.faqs.flatMap((f) => [f.q, f.a]),
  ].join(" ");

export const everydayMinutes = (g: UseCaseGuide) => Math.max(3, Math.round(everydayText(g).split(/\s+/).length / 220));

/** Free or open tools in a guide, for the hub cards. */
export const freeToolCount = (g: UseCaseGuide) => g.tools.filter((t) => t.cost !== "paid").length;
export const openToolCount = (g: UseCaseGuide) => g.tools.filter((t) => t.cost === "open-source" || t.cost === "open-weights").length;
