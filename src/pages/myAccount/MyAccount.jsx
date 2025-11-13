import React, { useState } from 'react';
import { Edit, Check, X, Camera, Save } from 'lucide-react';
import { InputField, PageHeading, ValidationHandler } from '../../components';
import { Base } from '../../components/utility/Base';
import MyAccountDTO from './MyAccountDTO';
import { useAuth } from '../../hook/useAuth';
import profilePicture from '../../assets/images/user.png';

export default function MyAccount() {
    const [activeTab, setActiveTab] = useState('general');
    const [isEditing, setIsEditing] = useState(false);
    const { user } = useAuth();

    const [state, setState] = useState({
        payload: {
            FIRST_NAME: user?.FIRST_NAME ?? "",
            LAST_NAME: user?.LAST_NAME ?? "",
            MOBILE: user?.MOBILE ?? "",
            EMAIL_ID: user?.EMAIL ?? "",
            PROFILE_PICTURE: user?.profilePicture ?? ""
        },
    });

    // Sync local payload when user changes (e.g., after login)
    React.useEffect(() => {
        if (user) {
            setState({
                payload: {
                    FIRST_NAME: user.FIRST_NAME ?? "",
                    LAST_NAME: user.LAST_NAME ?? "",
                    MOBILE: user.MOBILE ?? "",
                    EMAIL_ID: user.EMAIL ?? "",
                    PROFILE_PICTURE: user.profilePicture ?? ""
                }
            });
        }
    }, [user]);

    const { payload } = state;

    const tabs = [
        { id: 'general', label: 'General Details' },
        { id: 'bank', label: 'Bank Accounts' },
        { id: 'delivery', label: 'Delivery Addresses' }
    ];

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const {
        validateInputHandler,
        validateFormHandler,
        inputChangeHandler,
        inputMessageHandler,
    } = ValidationHandler();

    const handleBlur = (evt) => {
        validateInputHandler(evt);
    };

    const { fileToBase64, fetchData, basePathAction } = Base();
    const profileContext = { setState, validateFormHandler, fetchData, basePathAction, fileToBase64 }
    const { submitHandler, uploadProfilePicHandler } = MyAccountDTO(profileContext);

    const renderGeneralDetails = () => (
        <div className="bg-white dark:bg-gray-700 rounded-md shadow-sm p-6">
            {(() => {
                const fields = [
                    { key: 'FIRST_NAME', label: 'First Name', type: 'text', dataType: 'ALPHA_SPACE' },
                    { key: 'LAST_NAME', label: 'Last Name', type: 'text', dataType: 'ALPHA_SPACE' },
                    { key: 'MOBILE', label: 'Mobile No.', type: 'tel', dataType: 'NUMBER', dataValidation: 'MOBILE', maxLength: 10 },
                    { key: 'EMAIL_ID', label: 'Email ID', type: 'email', dataType: 'EMAIL', dataValidation: 'EMAIL' },
                ];

                return (
                    <div className="grid grid-cols-10 gap-8">
                        {/* Profile Picture / Left Panel */}
                        <div className="col-span-12 md:col-span-3 flex justify-center">
                            <div className="relative group w-40 h-48">
                                <img
                                    src={payload.PROFILE_PICTURE ? payload.PROFILE_PICTURE : profilePicture}
                                    alt="Avatar"
                                    className="w-40 h-48 rounded object-cover border max-h-48 max-w-40"
                                />
                                <input
                                    id="avatar-input"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={e => { uploadProfilePicHandler(e) }}
                                />
                                <label
                                    htmlFor="avatar-input"
                                    className="absolute inset-0 flex items-center justify-center rounded cursor-pointer bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
                                    title="Change photo"
                                >
                                    <Camera className="w-6 h-6 text-white dark:text-white" />
                                </label>
                            </div>
                        </div>

                        {/* Details Right Panel */}
                        <div className="col-span-12 md:col-span-7 form-section">
                            <div className="border rounded-md divide-y ">
                                {fields.map((field) => (
                                    <div key={field.key} className="p-3">
                                        {isEditing ? (
                                            <div className="flex justify-between items-center ">
                                                <div className="flex-1 mr-4 -mb-3">
                                                    <label htmlFor={field.key} className="block text-sm text-gray-500 dark:text-gray-300 mb-1">{field.label}</label>
                                                    <InputField
                                                        id={field.key}
                                                        type={field.type}
                                                        name={field.key}
                                                        placeholder={`Enter your ${field.label.toLowerCase()}`}
                                                        value={payload[field.key] || ""}
                                                        onBlur={handleBlur}
                                                        onChange={evt => {
                                                            inputChangeHandler(evt, setState);
                                                            inputMessageHandler(evt, 'HIDE', 'error');
                                                        }}
                                                        isRequired={true}
                                                        className="input-field custom-input"
                                                        dataType={field.dataType}
                                                        dataValidation={field.dataValidation}
                                                        maxLength={field.maxLength}
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex justify-between items-center">
                                                <label htmlFor={field.key} className="block text-sm text-gray-500 dark:text-gray-300 mb-1">{field.label}</label>
                                                <span className="text-gray-900 dark:text-gray-200">{payload[field.key] || "--"}</span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            {isEditing ? (
                                <div className='flex justify-center space-x-2'>
                                    <button onClick={evt => submitHandler(evt, payload)} className="flex items-center space-x-0.5 px-3 py-2 bg-secondary text-white rounded-md text-xs font-medium hover:bg-primary transition-colors mt-4">
                                        <Save className="w-4 h-4 mr-1" /> Save Information
                                    </button>
                                    <button onClick={() => handleCancel()} className="flex items-center space-x-0.5 px-3 py-2 bg-secondary text-white rounded-md text-xs font-medium hover:bg-primary transition-colors mt-4">
                                        <X className="w-4 h-4 mr-1" /> Cancel
                                    </button>
                                </div>
                            ) : (
                                <div className='flex justify-center'>
                                    <button onClick={() => handleEdit()} className="flex items-center space-x-0.5 px-6 py-2 bg-secondary text-white rounded-md text-xs font-medium hover:bg-primary transition-colors mt-4">
                                        <Edit className="w-4 h-4 mr-1" /> Edit
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })()}
        </div>
    );

    const renderBankAccounts = () => (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-200 mb-2">No Bank Accounts</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">You haven't added any bank accounts yet.</p>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                    Add Bank Account
                </button>
            </div>
        </div>
    );

    const renderDeliveryAddresses = () => (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-200 mb-2">No Delivery Addresses</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">You haven't added any delivery addresses yet.</p>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                    Add Delivery Address
                </button>
            </div>
        </div>
    );

    return (
        <>
            <PageHeading
                mainHeadng="My Account"
                description="Manage your account details"
            />
            {/* Tabs */}
            <div className="border-b border-gray-200 mb-3">
                <nav className="-mb-px flex space-x-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
                                ? 'border-lightNavyBlue text-lightNavyBlue dark:border-blue-400 dark:text-blue-400'
                                : 'border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-200'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Tab Content */}
            {activeTab === 'general' && renderGeneralDetails()}
            {activeTab === 'bank' && renderBankAccounts()}
            {activeTab === 'delivery' && renderDeliveryAddresses()}
        </>
    );
}
