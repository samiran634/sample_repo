/**
 * Email Theme Configuration
 * Defines the visual style for application emails
 */

export const emailTheme = {
    colors: {
        primary: '#4A90E2',
        secondary: '#F5F5F5',
        text: '#333333',
        muted: '#888888',
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107',
        background: '#ffffff',
        border: '#e1e4e8'
    },
    fonts: {
        body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        heading: 'Georgia, Times, "Times New Roman", serif',
        monospace: 'SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace'
    },
    spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        xxl: '48px'
    },
    borderRadius: {
        small: '4px',
        medium: '8px',
        large: '12px',
        round: '50%'
    }
};

/**
 * Helper to generate inline styles for email templates
 * @param component The component name to get styles for
 */
export const getComponentStyle = (component: 'button' | 'card' | 'header' | 'footer'): string => {
    const { colors, spacing, borderRadius, fonts } = emailTheme;

    switch (component) {
        case 'button':
            return `
                background-color: ${colors.primary};
                color: ${colors.background};
                padding: ${spacing.md} ${spacing.lg};
                border-radius: ${borderRadius.small};
                text-decoration: none;
                font-family: ${fonts.body};
                font-weight: bold;
                display: inline-block;
            `;
        case 'card':
            return `
                background-color: ${colors.background};
                border: 1px solid ${colors.border};
                border-radius: ${borderRadius.medium};
                padding: ${spacing.lg};
                margin-bottom: ${spacing.md};
            `;
        case 'header':
            return `
                background-color: ${colors.secondary};
                padding: ${spacing.xl} ${spacing.md};
                text-align: center;
                border-bottom: 1px solid ${colors.border};
            `;
        case 'footer':
            return `
                padding: ${spacing.lg};
                text-align: center;
                color: ${colors.muted};
                font-size: 12px;
            `;
        default:
            return '';
    }
};
