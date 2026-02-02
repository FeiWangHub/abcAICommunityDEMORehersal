-- External Resources Table
CREATE TABLE external_resources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL,
    url VARCHAR(500) NOT NULL,
    metadata JSONB DEFAULT '{}',
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_external_resources_category ON external_resources(category);
CREATE INDEX idx_external_resources_active ON external_resources(is_active);
CREATE INDEX idx_external_resources_sort ON external_resources(sort_order);

-- Internal Resources Table
CREATE TABLE internal_resources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    resource_type VARCHAR(50) NOT NULL,
    description TEXT,
    access_url VARCHAR(500),
    responsible_person VARCHAR(255),
    installation_guide JSONB DEFAULT '{}',
    requires_auth BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_internal_resources_type ON internal_resources(resource_type);
CREATE INDEX idx_internal_resources_auth ON internal_resources(requires_auth);

-- User Feedback Table
CREATE TABLE user_feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    message TEXT NOT NULL,
    user_email VARCHAR(255),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'responded', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    responded_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_user_feedback_status ON user_feedback(status);
CREATE INDEX idx_user_feedback_created ON user_feedback(created_at DESC);

-- Grant permissions
GRANT SELECT ON external_resources TO anon;
GRANT ALL PRIVILEGES ON external_resources TO authenticated;

GRANT SELECT ON internal_resources TO anon;
GRANT ALL PRIVILEGES ON internal_resources TO authenticated;

GRANT INSERT ON user_feedback TO anon;
GRANT SELECT, UPDATE ON user_feedback TO authenticated;

-- Initial Data Sample
INSERT INTO external_resources (name, description, category, url, metadata, sort_order) VALUES
('TensorFlow', 'Open-source machine learning framework', 'development_tools', 'https://tensorflow.org', '{"icon": "tf", "version": "2.0"}', 1),
('OpenRouter', 'Unified API for AI models', 'model_providers', 'https://openrouter.ai', '{"features": ["multi-model", "unified-api"]}', 1),
('AI Model Benchmarks', 'Latest AI performance comparisons', 'benchmarks', 'https://benchmarks.example.com', '{"sortable": true, "charts": true}', 1);

INSERT INTO internal_resources (name, resource_type, description, access_url, responsible_person, installation_guide) VALUES
('Modu Garden', 'model_garden', 'Company AI model platform', 'https://internal.modu.example.com', 'AI Team', '{"command": "pip install modu-garden", "guide": "Follow setup instructions"}'),
('GitHub Copilot', 'ai_software', 'AI pair programming assistant', 'https://github.com/features/copilot', 'Dev Tools Team', '{"vscode": "ext install github.copilot", "activation": "Use company SSO"}');
