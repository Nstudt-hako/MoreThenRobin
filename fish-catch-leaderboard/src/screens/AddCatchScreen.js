import React, { useContext, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import { addCatch } from '../api/firebase';
import { useToast } from '../context/ToastContext';

// Initial form state constant for clarity & reuse
const INITIAL_FORM = { species: '', size: '', location: '', photo: '' };

const AddCatchScreen = () => {
    const { theme } = useContext(ThemeContext);
    const { user } = useContext(AuthContext);
    const [form, setForm] = useState(INITIAL_FORM);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const toast = useToast();

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        if (!form.species.trim()) return 'Species is required';
        if (!form.size || isNaN(Number(form.size)) || Number(form.size) <= 0) return 'Size must be a positive number';
        return '';
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }
        setSubmitting(true);
        try {
            await addCatch({
                species: form.species.trim(),
                size: Number(form.size),
                location: form.location.trim() || undefined,
                angler: user?.email || 'Anonymous',
                photo: form.photo.trim() || undefined
            });
            setSuccess(true);
            toast.push('Catch saved', 'success');
            setForm(INITIAL_FORM);
        } catch (err) {
            if (err.code === 'rate/limit-exceeded') setError(err.message);
            else if (err.code === 'photo/required') setError(err.message);
            else setError('Could not save catch');
            toast.push('Could not save catch', 'error');
        } finally {
            setSubmitting(false);
        }
    };

    if (!user) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center', color: theme.text }}>
                <h1 style={{ color: theme.primary }}>Add Catch</h1>
                <p>Please log in to record a catch.</p>
            </div>
        );
    }

    return (
        <div className="form-container" style={{ backgroundColor: theme.surface, color: theme.text }}>
            <h1 style={{ color: theme.primary, textAlign: 'center', marginBottom: '1rem' }}>Add New Catch</h1>
            <form onSubmit={onSubmit} noValidate>
                <div className="form-group">
                    <label htmlFor="species">Species *</label>
                    <input id="species" name="species" value={form.species} onChange={onChange} placeholder="e.g. Pike" />
                </div>
                <div className="form-group">
                    <label htmlFor="size">Size (cm) *</label>
                    <input id="size" name="size" type="number" value={form.size} onChange={onChange} placeholder="e.g. 75" />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input id="location" name="location" value={form.location} onChange={onChange} placeholder="Lake name" />
                </div>
                <div className="form-group">
                    <label htmlFor="photo">Photo URL</label>
                    <input id="photo" name="photo" value={form.photo} onChange={onChange} placeholder="https://..." />
                </div>
                {error && <p style={{ color: theme.error, marginBottom: '0.5rem' }}>{error}</p>}
                {success && <p style={{ color: 'green', marginBottom: '0.5rem' }}>Catch added!</p>}
                <button type="submit" className="btn" disabled={submitting}>
                    {submitting ? 'Saving...' : 'Save Catch'}
                </button>
            </form>
        </div>
    );
};

export default AddCatchScreen;