import InnerSection from '@/components/common/InnerSection';
import OuterSection from '@/components/common/OuterSection';
import PrimaryButton from '@/components/common/PrimaryButton';
import SecondaryButton from '@/components/common/SecondaryButton';
import React, { useMemo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/usePageSeo';
import { fetchSeos } from '@/redux/seo/seoAction';
import { useDispatch, useSelector } from 'react-redux';
import { mapApiSeoToUseSEO } from '@/utils/mapApiSeoToUseSEO';

export default function LandingPage() {
  const [openModules, setOpenModules] = useState([]); // multiple open support

  const syllabus = useMemo(
    () => [
      {
        title: 'Module 1: Introduction to AI',
        classes: [
          {
            class: 'Class 1: Course Overview + AI Basics',
            modules: [
              'What is AI and how it works',
              'AI vs Automation vs Machine Learning',
              'Real-life examples',
            ],
          },
          {
            class: 'Class 2: Course Overview + AI Basics',
            modules: [
              'What is AI and how it works',
              'AI vs Automation vs Machine Learning',
              'Real-life examples',
            ],
          },
        ],
      },
      {
        title: 'Module 2: AI for Personal Productivity',
        classes: [
          {
            class: 'Class 1: Course Overview + AI Basics',
            modules: [
              'What is AI and how it works',
              'AI vs Automation vs Machine Learning',
              'Real-life examples',
            ],
          },
          {
            class: 'Class 2: Course Overview + AI Basics',
            modules: [
              'What is AI and how it works',
              'AI vs Automation vs Machine Learning',
              'Real-life examples',
            ],
          },
        ],
      },
    ],
    []
  );

  const faqs = useMemo(
    () => [
      { q: 'How long is the course?', a: '2 months · 16 live online classes · 2 hours each.' },
      {
        q: 'Do I need coding experience?',
        a: 'No. It’s designed for beginners and non-technical learners.',
      },
      {
        q: 'Will I get a certificate?',
        a: 'Yes, an official certificate upon successful completion.',
      },
      {
        q: 'Can I pay in installments?',
        a: 'Yes, you can pay a portion during registration and the rest later.',
      },
      {
        q: 'Are sessions recorded?',
        a: 'All live classes are recorded and shared for replay anytime.',
      },
    ],
    []
  );

  const [openFaq, setOpenFaq] = useState(0);

  const [pageSeo, setPageSeo] = useState(null);
  const { seos } = useSelector((state) => state.seo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSeos());
  }, []);

  useEffect(() => {
    setPageSeo(seos.find((item) => item.page_name == 'landing'));
  }, [seos]);

  useSEO(pageSeo ? mapApiSeoToUseSEO(pageSeo) : {});

  return (
    <>
      {/* Hero */}
      <OuterSection
        className="relative pt-navbar bg-cover bg-center"
        style={{ backgroundImage: `url(https://codersfly.xyz/test-site/img/hero-1.jpg)` }}
      >
        <div className="absolute left-0 top-0 w-full h-full bg-black/50 backdrop-blur-sm" />
        <InnerSection className="z-1 flex flex-col lg:flex-row gap-lg">
          <div className="flex-1 flex flex-col gap-lg">
            <div className="inline-flex w-fit items-center rounded-full bg-secondary/20 px-3 py-1 text-[12px] font-extrabold text-secondary">
              2 Months · 16 Live Classes · Online
            </div>

            <h1 className="text-5xl text-white font-extrabold leading-tight tracking-tight">
              The World is changing. The way we work is changing. Tomorrow, AI will do half of
              today’s tasks. The question is—are you ready?
            </h1>
            <p className="text-lg font-semibold text-secondary">
              Tomorrow, AI will do half of today’s tasks. Are you ready?
            </p>
            <p className="max-w-[65ch] text-slate-600 text-white/50">
              Imagine—you’re busy, yet AI writes emails, prepares study notes, analyzes data,
              designs slides, schedules meetings, and creates social content in a click. That’s the
              future-ready skill set—AI for Personal & Official Uses.
            </p>

            <div className="flex flex-wrap gap-3">
              <PrimaryButton from="hero" text="Enroll Now" to="#enroll" />
              <SecondaryButton from="hero" text="Watch Course Preview" to="#preview" />
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="rounded-xl h-[320px] w-full max-w-[500px] bg-[radial-gradient(1000px_400px_at_0%_0%,rgba(243,206,73,0.15),transparent_60%),url('https://codersfly.xyz/test-site/img/hero-2.png')] bg-center bg-cover bg-no-repeat relative">
              <div className="text-white absolute -right-5 -bottom-5 border border-white/30 backdrop-blur-sm p-lg rounded-lg">
                <b>What will you learn?</b>
                <ul className="list-disc list-inside mt-sm ml-xl">
                  <li>AI Tools: ChatGPT, Gemini, Bard</li>
                  <li>Prompt Writing &amp; Office Automation</li>
                  <li>Creative AI: Image · Video · Voice</li>
                  <li>Data Analysis &amp; Reporting</li>
                </ul>
              </div>
            </div>
          </div>
        </InnerSection>
      </OuterSection>

      {/* Price card */}
      <OuterSection>
        <InnerSection>
          <div id="pricing">
            <div className="rounded-2xl bg-white p-5 shadow-around-sm ring-1 ring-slate-200">
              <div className="font-bold heading-3xl text-primary-light">Course Fee & Offer</div>
              <div className="mt-lg flex items-baseline gap-2">
                <span className="text-black/50 text-2xl line-through">৳ 10,000</span>
                <span className="text-5xl font-black text-primary">৳ 4,000</span>
              </div>
              <p className="mb-lg text-sm text-slate-600">
                Special introductory price for the first 20 learners.
              </p>
              <Link
                to="#enroll"
                className="mt-3 inline-flex h-11 w-full items-center justify-center rounded-lg bg-secondary px-3 font-extrabold text-amber-950 shadow-around-sm transition hover:brightness-105"
              >
                Enroll Now
              </Link>

              <div className="mt-4 rounded-xl bg-amber-50 p-3 ring-1 ring-amber-100">
                <div className="text-md font-extrabold text-primary">🎉 Offer ends in:</div>
                <div className="mt-2 grid grid-cols-3 gap-3 text-center">
                  <Countdown num="00" label="Days" />
                  <Countdown num="00" label="Hours" />
                  <Countdown num="00" label="Minutes" />
                </div>
              </div>
            </div>
          </div>
        </InnerSection>
      </OuterSection>

      <OuterSection className="bg-primary">
        <InnerSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:grid-cols-4">
            <Stat num="500+" label="Learners" />
            <Stat num="99%" label="Satisfaction" />
            <Stat num="16" label="Live Classes" />
            <Stat num="3×" label="Productivity" />
          </div>
        </InnerSection>
      </OuterSection>

      {/* What you'll learn */}
      <OuterSection id="about" className="bg-white">
        <InnerSection className="w-full">
          <h2 className="heading-4xl font-bold">Benefits of This Course</h2>
          <p className="text-lg leading-xl text-black/50 my-md">
            Whether for personal tasks or office workflows—AI can boost your productivity up to 3×.
            With Prime Academy’s industry-aligned curriculum, you’ll learn hands-on, not just
            theory.
          </p>
          <div className="mt-4 grid gap-lg grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <Card
              content={{
                icon: '✔',
                heading: 'Hands-on Learning',
                description: 'Live tasks and real-world projects in every class.',
              }}
            />
            <Card
              content={{
                icon: '✔',
                heading: 'Hands-on Learning',
                description: 'Live tasks and real-world projects in every class.',
              }}
            />
            <Card
              content={{
                icon: '✔',
                heading: 'Hands-on Learning',
                description: 'Live tasks and real-world projects in every class.',
              }}
            />
            <Card
              content={{
                icon: '✔',
                heading: 'Hands-on Learning',
                description: 'Live tasks and real-world projects in every class.',
              }}
            />
            <Card
              content={{
                icon: '✔',
                heading: 'Hands-on Learning',
                description: 'Live tasks and real-world projects in every class.',
              }}
            />
            <Card
              content={{
                icon: '✔',
                heading: 'Hands-on Learning',
                description: 'Live tasks and real-world projects in every class.',
              }}
            />
          </div>
        </InnerSection>
      </OuterSection>

      {/* Why Choose Us */}
      <OuterSection id="about" className="bg-secondary-light/20">
        <InnerSection className="w-full">
          <h2 className="heading-4xl font-bold">Why Choose Us</h2>
          <p className="text-lg leading-xl text-black/50 my-md">
            A focused, outcomes-driven program designed for rapid skill-building and real-world
            impact.
          </p>
          <div className="mt-4 grid gap-lg grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <Card
              content={{
                icon: '★',
                heading: 'Hands-on Learning',
                description: 'Live tasks and real-world projects in every class.',
              }}
            />
            <Card
              content={{
                icon: '★',
                heading: 'Hands-on Learning',
                description: 'Live tasks and real-world projects in every class.',
              }}
            />
            <Card
              content={{
                icon: '★',
                heading: 'Hands-on Learning',
                description: 'Live tasks and real-world projects in every class.',
              }}
            />
            <Card
              content={{
                icon: '★',
                heading: 'Hands-on Learning',
                description: 'Live tasks and real-world projects in every class.',
              }}
            />
            <Card
              content={{
                icon: '★',
                heading: 'Hands-on Learning',
                description: 'Live tasks and real-world projects in every class.',
              }}
            />
            <Card
              content={{
                icon: '★',
                heading: 'Hands-on Learning',
                description: 'Live tasks and real-world projects in every class.',
              }}
            />
          </div>
        </InnerSection>
      </OuterSection>

      {/* Syllabus */}
      <OuterSection id="syllabus" className="bg-white">
        <InnerSection className="w-full">
          <h2 className="text-3xl text-primary font-bold">Syllabus (Full)</h2>
          <p className="mt-md text-base text-black/50">
            Duration: <b className="text-primary">2 months</b> · Total Classes:{' '}
            <b className="text-primary">16</b> · Class Length:{' '}
            <b className="text-primary">2 hours each</b>
          </p>
          <div className="mt-4 grid gap-3">
            {syllabus.map((m, idx) => (
              <AccordionItem
                key={m.title}
                open={openModules.includes(idx)}
                onToggle={() => {
                  if (openModules.includes(idx)) {
                    // already open → close manually
                    setOpenModules(openModules.filter((i) => i !== idx));
                  } else {
                    // not open → open this one
                    setOpenModules([...openModules, idx]);
                  }
                }}
                title={m.title}
                tag={m.tag}
              >
                {m.classes.map((item, index) => (
                  <div className="px-lg mt-sm" key={index}>
                    <h3 className="text-lg text-black font-bold">{item.class}</h3>
                    <ul className="list-disc list-inside my-sm ml-xl">
                      {item.modules.map((module, index) => (
                        <li className="text-base text-black" key={index}>
                          {module}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </AccordionItem>
            ))}
          </div>
        </InnerSection>
      </OuterSection>

      {/* Instructor */}
      <OuterSection id="instructor" className="bg-white">
        <InnerSection className="w-full">
          <div className="flex items-center gap-lg rounded-2xl bg-white p-5 shadow-around-sm flex-col md:flex-row">
            <img
              className="w-[300px] rounded-lg"
              src="https://codersfly.xyz/test-site/img/polok.png"
              alt="Instructor"
            />
            <div>
              <h3 className="text-xl font-extrabold">J. R. Polok</h3>
              <div className="flex gap-md my-sm text-sm flex-wrap">
                {['Enterprise Integrations', '4+ yrs Experience', 'AI & Automation Specialist'].map(
                  (item, index) => (
                    <p
                      key={index}
                      className="border border-secondary/50 mr-md w-fit items-center rounded-full bg-secondary/20 px-3 py-1 text-xs font-bold text-primary"
                    >
                      {item}
                    </p>
                  )
                )}
              </div>
              <p className="mt-2 text-slate-600">
                Has helped organizations deploy practical AI—covering automation, content, and data
                workflows. Teaching is hands-on and outcome-driven.
              </p>
              <div className="mt-3 flex flex-wrap gap-3 text-sm text-black/50">
                <span>
                  <b className="text-base text-primary">150+</b> learners
                </span>
                <span>
                  <b className="text-base text-primary">99%</b> satisfaction
                </span>
                <span>
                  <b className="text-base text-primary">20+</b> projects mentored
                </span>
              </div>
              <div className="mt-3 flex gap-3">
                <PrimaryButton text={`Linkedin`} href={`https://linkedin.com/in/ab-sabur`} />
                <SecondaryButton
                  className="text-primary border-primary hover:text-white hover:border-secondary hover:bg-secondary"
                  text={`Portfolio`}
                  href={`https://absabur.vercel.app`}
                />
              </div>
            </div>
          </div>
        </InnerSection>
      </OuterSection>

      {/* Testimonials */}
      <OuterSection className="">
        <InnerSection className="z-1 mx-auto w-full">
          <h2 className="text-[28px] font-extrabold tracking-tight">What learners say</h2>
          <div className="mt-4 grid gap-lg md:grid-cols-2">
            <Testimonial
              name="Shamim Ahmed"
              role="Working Professional"
              quote="This AI course made my office work incredibly faster. Now I prepare reports in just five minutes!"
            />
            <Testimonial
              name="Nusrat Jahan"
              role="Freelancer"
              quote="The Prompt Writing module was outstanding. I can now get AI to do exactly what I want."
            />
          </div>
        </InnerSection>
      </OuterSection>

      {/* Video */}
      <OuterSection className="bg-white">
        <InnerSection>
          <div className="rounded-2xl bg-primary px-lg py-md shadow-around-sm ring-1 ring-slate-200">
            <div className="aspect-video w-full overflow-hidden rounded-xl">
              <iframe
                src="https://www.youtube-nocookie.com/embed/uWq4JU3GQkI?controls=0&modestbranding=1&rel=0&showinfo=0"
                title="AI for Personal and Official Uses"
                className="h-full w-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </InnerSection>
      </OuterSection>

      {/* Enroll */}
      <OuterSection id="enroll" className="bg-amber-50/60">
        <InnerSection className="mx-auto grid w-full grid-cols-1 gap-lg md:grid-cols-[1.1fr,0.9fr]">
          <div className="rounded-2xl bg-white p-6 shadow-around-sm ring-1 ring-slate-200">
            <h2 className="text-[28px] font-extrabold tracking-tight">
              Enroll Now (Offer Price: ৳ 4,000)
            </h2>
            <form className="mt-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-lg md:grid-cols-2">
                <Field label="Full Name">
                  <input
                    className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-slate-800 outline-none placeholder:text-slate-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                    placeholder="Your name"
                    required
                  />
                </Field>
                <Field label="Mobile Number">
                  <input
                    className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-slate-800 outline-none placeholder:text-slate-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                    placeholder="+880..."
                    required
                  />
                </Field>
                <Field label="Email">
                  <input
                    type="email"
                    className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-slate-800 outline-none placeholder:text-slate-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                    placeholder="you@example.com"
                  />
                </Field>
                <Field label="Profession">
                  <select className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-slate-800 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100">
                    <option>Student</option>
                    <option>Working Professional</option>
                    <option>Freelancer</option>
                    <option>Entrepreneur</option>
                    <option>Other</option>
                  </select>
                </Field>
                <Field label="Preferred Schedule">
                  <select className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-slate-800 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100">
                    <option>Weekend (Fri–Sat)</option>
                    <option>Weekday (Mon–Wed)</option>
                    <option>Evening (8–10 PM)</option>
                  </select>
                </Field>
                <Field label="Contact Time">
                  <select className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-slate-800 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100">
                    <option>Morning (9–12)</option>
                    <option>Afternoon (12–4)</option>
                    <option>Evening (4–8)</option>
                    <option>Night (After 8 PM)</option>
                    <option>Weekend Anytime (Flexible)</option>
                  </select>
                </Field>
                <Field label="AI Usage Frequency">
                  <select className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-slate-800 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100">
                    <option>Never</option>
                    <option>Moderately</option>
                    <option>Frequently</option>
                    <option>Always</option>
                  </select>
                </Field>
                <div className="md:col-span-2">
                  <label className="grid gap-1 text-sm">
                    <span className="font-extrabold text-slate-600">Message</span>
                    <textarea
                      rows={4}
                      className="w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-800 outline-none placeholder:text-slate-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                      placeholder="Anything we should know?"
                    />
                  </label>
                </div>
                <label className="md:col-span-2 flex items-center gap-2 text-sm text-slate-600">
                  <input type="checkbox" defaultChecked className="size-4 accent-secondary" />
                  <span>I agree to be contacted via phone/email.</span>
                </label>
              </div>
              <button
                className="mt-3 inline-flex h-11 w-full items-center justify-center rounded-lg bg-secondary font-extrabold text-amber-950 shadow-around-sm transition hover:brightness-105"
                type="submit"
              >
                Submit Form
              </button>
              <p className="mt-2 text-xs text-slate-600">
                Data Security: Your info will only be used for course-related communication.
              </p>
            </form>
          </div>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl shadow-around-sm p-lg ring-slate-200 ring-1 bg-white">
              <h3 className="text-lg font-extrabold">Contact</h3>
              <p className="mt-2 text-sm text-black/50">
                <strong className="text-black">Address:</strong> Suite 5040, Lift 5, Shimanto
                Shambhar, BGB Gate, Road 02, Dhaka, Bangladesh
              </p>
              <p className="mt-1 text-sm text-black/50">
                <strong className="text-black">Phone:</strong> +880 1300 290492
              </p>
              <p className="mt-1 text-sm text-black/50">
                <strong className="text-black">Website:</strong>{' '}
                <Link
                  className="text-secondary"
                  to="https://www.primeacademy.org"
                  target="_blank"
                  rel="noreferrer"
                >
                  primeacademy.org
                </Link>
              </p>
            </div>

            <div className="rounded-2xl shadow-around-sm p-lg ring-slate-200 ring-1 bg-white">
              <h4 className="font-extrabold">Included</h4>
              <ul className="mt-2 grid gap-2 text-sm text-black/50">
                <li className="before:mr-2 before:text-secondary before:content-['✔']">
                  Live classes + recordings
                </li>
                <li className="before:mr-2 before:text-secondary before:content-['✔']">
                  Hands-on projects & reviews
                </li>
                <li className="before:mr-2 before:text-secondary before:content-['✔']">
                  Certificate on completion
                </li>
              </ul>
            </div>

            <div className="rounded-2xl shadow-around-sm shadow-lg p-lg ring-slate-200 ring-1 bg-white">
              <h4 className="font-extrabold">Outcomes</h4>
              <ul className="mt-2 grid gap-2 text-sm text-black/50">
                <li className="before:mr-2 before:text-secondary before:content-['•']">
                  Automate office and study tasks
                </li>
                <li className="before:mr-2 before:text-secondary before:content-['•']">
                  Create reports, content, and presentations
                </li>
                <li className="before:mr-2 before:text-secondary before:content-['•']">
                  Offer AI-supported freelance services
                </li>
              </ul>
            </div>
          </div>
        </InnerSection>
      </OuterSection>

      {/* FAQ */}
      <OuterSection className="bg-white">
        <InnerSection className="w-full">
          <h2 className="text-[28px] font-extrabold tracking-tight">FAQ</h2>
          <div className="mt-4 grid gap-3">
            {faqs.map((f, idx) => (
              <AccordionItem
                key={f.q}
                open={openFaq === idx}
                onToggle={() => setOpenFaq(openFaq === idx ? null : idx)}
                title={f.q}
              >
                <p className="px-lg text-sm text-slate-600">{f.a}</p>
              </AccordionItem>
            ))}
          </div>
        </InnerSection>
      </OuterSection>
    </>
  );
}

/* ——— Reusable pieces ——— */

function Stat({ num, label }) {
  return (
    <div className="bg-black/20 backdrop-blur-lg border border-secondary/30 rounded-xl p-lg space-y-lg text-center shadow-around-sm">
      <div className="text-3xl font-bold text-secondary-light">{num}</div>
      <div className="text-base text-white/50">{label}</div>
    </div>
  );
}

function Countdown({ num, label }) {
  return (
    <div>
      <strong className="block text-xl text-amber-900">{num}</strong>
      <span className="text-[11px] text-amber-900/70">{label}</span>
    </div>
  );
}

function Card({ content }) {
  return (
    <div className="rounded-2xl bg-white p-xl shadow-around-sm space-y-sm">
      <h3 className="text-2xl text-primary font-bold">
        <span className="mr-md text-secondary-light">{content?.icon}</span>
        {content?.heading}
      </h3>
      <p className="text-lg">{content?.description}</p>
    </div>
  );
}

function IconCard({ title, desc }) {
  return (
    <div className="grid grid-cols-[44px,1fr] items-start gap-3 rounded-2xl bg-white p-5 shadow-around-sm ring-1 ring-slate-200">
      <div className="grid h-11 w-11 place-items-center rounded-lg bg-amber-100 font-black text-primary ring-1 ring-amber-200">
        ★
      </div>
      <div>
        <h3 className="text-lg font-extrabold">{title}</h3>
        <p className="text-sm text-slate-600">{desc}</p>
      </div>
    </div>
  );
}

function Testimonial({ name, role, quote }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-around-sm ring-1 ring-slate-200">
      <div className="mt-3 grid grid-cols-[40px,1fr] items-center gap-3">
        <div className="flex gap-md">
          <img
            src="https://codersfly.xyz/test-site/img/shamim.png"
            className="h-10 w-10 rounded-full"
          />
          <div>
            <div className="font-bold">{name}</div>
            <div className="text-xs text-slate-600">{role}</div>
          </div>
        </div>
        <blockquote className="font-semibold">“{quote}”</blockquote>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="font-extrabold text-slate-600">{label}</span>
      {children}
    </label>
  );
}

function AccordionItem(props) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-around-sm">
      <button
        type="button"
        onClick={props.onToggle}
        className="flex w-full items-center justify-between p-md px-lg text-left text-lg cursor-pointer"
      >
        <div className="flex items-center text-primary">
          <span className="font-extrabold">{props.title}</span>
        </div>
        <span className="grid h-7 w-7 place-items-center rounded-md bg-slate-50 font-black ring-1 ring-slate-200">
          {props.open ? '–' : '+'}
        </span>
      </button>
      <div className={props.open ? 'block px-4 pb-4' : 'hidden px-4 pb-4'}>{props.children}</div>
    </div>
  );
}
