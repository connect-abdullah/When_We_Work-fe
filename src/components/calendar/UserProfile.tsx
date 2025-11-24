"use client";

// ============================================================================
// USER PROFILE COMPONENT
// ============================================================================
// Simple component that displays the user's profile information:
// - Profile picture
// - User name
// This is a static display component with no interactive functionality.

export default function UserProfile() {
  return (
    <div className="flex flex-col items-center py-6 bg-white border-b border-gray-200">
      {/* PROFILE PICTURE */}
      <div className="w-16 h-16 rounded-full border-2 border-blue-200 overflow-hidden mb-3">
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face"
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>

      {/* USER NAME */}
      <h1 className="text-lg font-semibold text-gray-900">Uzair Anjum</h1>
    </div>
  );
}
