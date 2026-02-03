# OpenAPI/Swagger Documentation Setup Guide

## Overview
This project includes comprehensive OpenAPI 3.0 specification files for the AuraService API. These files can be used with various tools to generate interactive API documentation, SDKs, and more.

## Files Included

### 1. **openapi.yaml** (Recommended)
- YAML format (human-readable)
- Better for version control (less diff noise)
- Smaller file size
- More readable and maintainable

### 2. **openapi.json**
- JSON format
- Required by some tools
- Machine-readable and parseable
- Complete specification with full schema definitions

## Viewing the API Documentation

### Option 1: Swagger UI (Web-based)
**Simple and Free - No Installation Required**

1. Visit: https://editor.swagger.io/
2. Click: **File** → **Import URL**
3. Enter the raw URL to your openapi.yaml:
   ```
   https://raw.githubusercontent.com/yourusername/aura-radix/main/src/api/openapi.yaml
   ```
   Or paste the local file path in local development

**Features:**
- Interactive API explorer
- Try-it-out functionality (send real requests)
- Beautiful auto-generated documentation
- Schema visualization

### Option 2: ReDoc (Alternative Documentation)
**Modern, Mobile-friendly Alternative**

1. Visit: https://redoc.ly/
2. Import your openapi.yaml file
3. Get a clean, organized API reference

**Features:**
- Responsive design
- Better for mobile viewing
- Organized by tags
- Search functionality

### Option 3: Local Setup with Docker
**For Self-Hosted Documentation**

```bash
# Using Swagger UI
docker run -p 8080:8080 -v /path/to/openapi.yaml:/openapi.yaml \
  -e SWAGGER_JSON=/openapi.yaml swaggerapi/swagger-ui

# Using ReDoc
docker run -p 8080:80 -v /path/to/openapi.yaml:/openapi.yaml \
  -e SPEC_URL=/openapi.yaml redocly/redoc
```

## Using with Development Tools

### Postman
1. Open Postman
2. **File** → **Import**
3. Select **Link** tab
4. Paste URL or upload openapi.yaml
5. All endpoints automatically imported with request schemas

### IntelliJ / VS Code
**REST Client Extension (VS Code)**
```bash
# Install: REST Client extension
# The openapi.yaml file helps generate correct requests
```

**IntelliJ OpenAPI Support**
- Built-in support for OpenAPI files
- Real-time validation
- Code generation

## Code Generation

### Generate SDK/Client Libraries
Using OpenAPI Generator:

```bash
# Generate Python client
openapi-generator-cli generate -i src/api/openapi.yaml \
  -g python -o ./generated-sdk/python

# Generate TypeScript client
openapi-generator-cli generate -i src/api/openapi.yaml \
  -g typescript-fetch -o ./generated-sdk/typescript

# Generate Java client
openapi-generator-cli generate -i src/api/openapi.yaml \
  -g java -o ./generated-sdk/java
```

### Using OpenAPI Generator CLI
```bash
# Install
npm install @openapitools/openapi-generator-cli -D

# Or use Docker
docker run --rm -v $(pwd):/local openapitools/openapi-generator-cli \
  generate -i /local/src/api/openapi.yaml -g typescript-fetch \
  -o /local/generated-sdk/typescript
```

## API Validation

### Validate OpenAPI Specification
```bash
# Using spectacle CLI
npm install spectacle-cli -D
spectacle src/api/openapi.yaml

# Using openapi-spec-validator
pip install openapi-spec-validator
openapi-spec-validator src/api/openapi.yaml
```

## Publishing API Documentation

### Option 1: GitHub Pages
1. Generate HTML from openapi.yaml
2. Commit to `docs/` folder
3. Enable GitHub Pages in repository settings
4. Access at: `https://yourusername.github.io/aura-radix/api-docs`

### Option 2: API Portal
Use platforms like:
- **SwaggerHub** (https://swagger.io/tools/swaggerhub/)
- **Postman API Network**
- **AWS API Gateway**
- **Azure API Management**

## Integration with CI/CD

### GitHub Actions Example
```yaml
name: Validate OpenAPI
on: [push, pull_request]
jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install -g @openapitools/openapi-generator-cli
      - run: openapi-spec-validator src/api/openapi.yaml
```

## Best Practices

### Maintaining the Specification
1. **Keep Updated**: Update openapi.yaml whenever APIs change
2. **Version Control**: Commit spec changes with code changes
3. **Review Process**: Include spec review in pull requests
4. **Testing**: Validate spec in CI/CD pipeline
5. **Documentation**: Add examples and descriptions

### Structure Guidelines
- **Paths**: RESTful resource paths
- **Operations**: HTTP methods (GET, POST, PUT, DELETE)
- **Parameters**: Query, path, header parameters
- **Schemas**: Request/response object definitions
- **Security**: Authentication requirements

## Troubleshooting

### Import Issues
**Problem**: "Invalid OpenAPI file"
- **Solution**: Validate at https://editor.swagger.io/
- Check for YAML syntax errors
- Ensure proper indentation

### Missing Schemas
**Problem**: Referenced schemas not found
- **Solution**: Add missing schemas to components/schemas
- Check $ref paths are correct

### Authentication Not Working
**Problem**: Can't authenticate in Swagger UI
- **Solution**: 
  - Verify securitySchemes defined
  - Ensure JWT token format correct
  - Check CORS headers on backend

## Advanced Features

### Server Selection
The spec includes multiple servers:
- Local: `http://localhost:8080`
- Production: `https://api.aura.example.com`

Switch servers in Swagger UI dropdown

### Request Examples
Each endpoint includes example request/response bodies for quick reference

### Parameter Validation
- Min/max length for strings
- Enum values for specific fields
- Required vs optional fields

## Resources

- **OpenAPI 3.0 Spec**: https://spec.openapis.org/oas/v3.0.0
- **Swagger Editor**: https://editor.swagger.io/
- **ReDoc**: https://redoc.ly/
- **Postman**: https://www.postman.com/
- **OpenAPI Generator**: https://openapi-generator.tech/

## Next Steps

1. ✅ Share openapi.yaml with frontend/backend teams
2. ✅ Import into Postman for testing
3. ✅ Generate SDK libraries for clients
4. ✅ Publish documentation online
5. ✅ Set up validation in CI/CD pipeline

---

**Current Spec Version**: 1.0.0  
**Last Updated**: 2026-02-03  
**OpenAPI Version**: 3.0.0
