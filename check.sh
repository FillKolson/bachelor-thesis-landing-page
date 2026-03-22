#!/bin/bash

# Comprehensive Code Quality Check Script
# This script runs all code quality checks for the project

set -e  # Exit on error

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_ROOT"

echo "================================"
echo "🔍 CODE QUALITY CHECK"
echo "================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counter for checks
PASSED=0
FAILED=0

# Check 1: Prettier Format Check
echo "📋 Check 1: Prettier Code Formatting..."
if npm run format:check > /dev/null 2>&1; then
    echo -e "${GREEN}✅ PASSED${NC}: Code formatting is correct"
    ((PASSED++))
else
    echo -e "${RED}❌ FAILED${NC}: Code formatting issues found"
    echo "   Run: npm run format"
    ((FAILED++))
fi
echo ""

# Check 2: ESLint
echo "📋 Check 2: ESLint Code Analysis..."
if npm run lint > /dev/null 2>&1; then
    echo -e "${GREEN}✅ PASSED${NC}: ESLint analysis passed"
    ((PASSED++))
else
    echo -e "${RED}❌ FAILED${NC}: ESLint found issues"
    echo "   Run: npm run lint:fix"
    ((FAILED++))
fi
echo ""

# Check 3: TypeScript Type Checking
echo "📋 Check 3: TypeScript Type Checking..."
if npm run type-check > /dev/null 2>&1; then
    echo -e "${GREEN}✅ PASSED${NC}: TypeScript type checking passed"
    ((PASSED++))
else
    echo -e "${RED}❌ FAILED${NC}: TypeScript found type errors"
    ((FAILED++))
fi
echo ""

# Summary
echo "================================"
echo "📊 SUMMARY"
echo "================================"
echo -e "${GREEN}✅ Passed: $PASSED${NC}"
if [ $FAILED -gt 0 ]; then
    echo -e "${RED}❌ Failed: $FAILED${NC}"
else
    echo -e "${GREEN}✅ All checks passed!${NC}"
fi
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 Your code is ready to commit!${NC}"
    exit 0
else
    echo -e "${YELLOW}💡 Tip: Run 'npm run check:fix' to auto-fix issues${NC}"
    exit 1
fi
