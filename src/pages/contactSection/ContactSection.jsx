import { useState } from "react";
import { InputField, ValidationHandler } from "../../components";
import ContactSectionDTO from "./ContactSectionDTO";

const ContactSection = () => {
    const [state, setState] = useState({
        payload: {
            FIRST_NAME: "",
            LAST_NAME: "",
            EMAIL_ID: "",
            MOBILE: "",
            COMPANY_NAME: "",
            MESSAGE: "",
        },
    });

    const { validateInputHandler, inputChangeHandler, inputMessageHandler } = ValidationHandler();

    const handleBlur = (evt) => {
        validateInputHandler(evt);
    };
    const { submitHandler } = ContactSectionDTO();

    const fields = [
        { key: 'CONTACT_FIRST_NAME', name: 'FIRST_NAME', label: 'First Name', type: 'text', dataType: 'ALPHA_SPACE' },
        { key: 'CONTACT_LAST_NAME', name: 'LAST_NAME', label: 'Last Name', type: 'text', dataType: 'ALPHA_SPACE' },
        { key: 'CONTACT_MOBILE', name: 'MOBILE', label: 'Mobile', type: 'tel', dataType: 'NUMBER', dataValidation: 'MOBILE', maxLength: 10 },
        { key: 'CONTACT_COMPANY_NAME', name: 'COMPANY_NAME', label: 'Company Name', type: 'text', dataType: 'ALPHA_SPACE' },
    ];

    const payload = state.payload;

    return (
        <section id="contact" className="py-20 bg-[#f8faff] dark:bg-[#0c111c] text-center">
            <div className="max-w-3xl mx-auto px-6">
                {/* === Heading === */}
                <div data-aos="zoom-in-up" className="mb-10">
                    <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
                        Get in <span className="text-blue-600 dark:text-blue-400">Touch</span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">
                        Have any questions or feedback? We'd love to hear from you 💬
                    </p>
                </div>

                {/* === Contact Form === */}
                <form
                    data-aos="fade-up"
                    className="form-section grid grid-cols-1 sm:grid-cols-2 gap-6 text-left bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-lg"
                >
                    <div className="sm:col-span-2">
                        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">SEND US A MESSAGE</h2>
                        <p className="text-gray-600 dark:text-gray-300 text-base">Leave us a message and we will get back to you as soon as possible.</p>
                    </div>
                    {fields.map((field) => (
                        <InputField
                            key={field.key}
                            id={field.key}
                            type={field.type}
                            name={field.name}
                            label={field.label}
                            placeholder={`Enter your ${field.label.toLowerCase()}`}
                            value={payload[field.name] || ""}
                            onBlur={handleBlur}
                            onChange={evt => {
                                inputChangeHandler(evt, setState);
                                inputMessageHandler(evt, 'HIDE', 'error', null, field.name);
                            }}
                            isRequired={true}
                            className="input-field py-4 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            dataType={field.dataType}
                            dataValidation={field.dataValidation}
                            maxLength={field.maxLength}
                        />
                    ))}
                    {/* === Message === */}
                    <div className="sm:col-span-2">
                        <InputField
                            key="MESSAGE"
                            id="MESSAGE"
                            type="textarea"
                            name="MESSAGE"
                            label="Your Message"
                            placeholder={`Type your message...`}
                            value={payload.MESSAGE || ""}
                            onBlur={handleBlur}
                            onChange={evt => {
                                inputChangeHandler(evt, setState);
                                inputMessageHandler(evt, 'HIDE', 'error');
                            }}
                            className="input-field w-full text-[12px] px-3 py-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            maxLength={1000}
                        />
                    </div>

                    {/* === Submit Button === */}
                    <div className="sm:col-span-2 text-center">
                        <button
                            type="submit"
                            onClick={evt => submitHandler(evt, payload)}
                            className="mt-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-8 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                        >
                            Send Message
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default ContactSection;
